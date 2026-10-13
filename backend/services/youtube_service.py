import os
import glob
import shutil
import tempfile
import re
import threading
import time
import uuid
from typing import Optional
from fastapi import HTTPException
import yt_dlp

from database import (
    create_task,
    set_task_temp_dir,
    update_task_progress,
    update_task_ready,
    update_task_error,
    get_task,
    get_expired_or_stale_tasks,
    delete_task,
    get_setting
)

TASK_TTL_SECONDS = 900          # 15 minutes avant suppression
MAX_CONCURRENT_DOWNLOADS = 3    # Limite de conversions lourdes en simultané
PROGRESS_THROTTLE_SECONDS = 0.6 # Intervalle minimal d'écriture en base

download_semaphore = threading.Semaphore(MAX_CONCURRENT_DOWNLOADS)

# Chemin absolu unique et garanti
COOKIES_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "cookies.txt"))
if not os.path.exists(os.path.dirname(COOKIES_FILE_PATH)):
    COOKIES_FILE_PATH = os.path.abspath("cookies.txt")


def clean_error_message(err_msg: str) -> str:
    """Retire les codes de couleurs ANSI du terminal et les préfixes superflus."""
    clean = re.sub(r'\x1b\[[0-9;]*m', '', err_msg)
    clean = clean.replace("ERROR: [youtube] ", "").replace("ERROR: ", "")
    return clean.strip()

def get_base_ydl_opts() -> dict:
    opts = {
        'quiet': True,
        'no_warnings': True,
        'socket_timeout': 30,
        'geo_bypass': True,
    }

    if os.path.exists(COOKIES_FILE_PATH) and os.path.getsize(COOKIES_FILE_PATH) > 0:
        opts['cookiefile'] = COOKIES_FILE_PATH
        opts['extractor_args'] = {
            'youtube': {
                # web_creator (YouTube Studio) + mweb contournent le blocage PO-Token avec cookies sur datacenter
                'player_client': ['web_creator', 'mweb', 'web'],
            }
        }
    else:
        opts['extractor_args'] = {
            'youtube': {
                'player_client': ['android'],
            }
        }

    return opts

def format_duration(seconds: Optional[int]) -> str:
    if not seconds:
        return "00:00"
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def cleanup_task_file(task_id: str):
    """Supprime le dossier temporaire et retire la tâche de SQLite."""
    task = get_task(task_id)
    if not task:
        return

    temp_dir = task.get("temp_dir")
    if temp_dir and os.path.exists(temp_dir):
        try:
            shutil.rmtree(temp_dir, ignore_errors=True)
        except Exception as e:
            print(f"[Cleanup Error] Impossible de supprimer {temp_dir}: {e}")

    delete_task(task_id)


def cleanup_expired_tasks_worker():
    """Tâche d'arrière-plan périodique qui purge les fichiers et tâches expirés."""
    time.sleep(5)
    while True:
        try:
            expired_tasks = get_expired_or_stale_tasks(ttl_seconds=TASK_TTL_SECONDS)
            for t in expired_tasks:
                cleanup_task_file(t["task_id"])
        except Exception as e:
            print(f"[TTL Worker Error]: {e}")

        time.sleep(60)


ttl_thread = threading.Thread(target=cleanup_expired_tasks_worker, daemon=True)
ttl_thread.start()


def get_video_info(url: str) -> dict:
        # Vérification de la liste noire DMCA
    blacklisted = get_setting("blacklisted_urls", "")
    if blacklisted:
        blocked_list = [b.strip() for b in blacklisted.split("\n") if b.strip()]
        if any(blocked in url for blocked in blocked_list):
            raise HTTPException(
                status_code=403, 
                detail="Cette vidéo a été désactivée suite à une demande de retrait DMCA."
            )
    """Extraction rapide des métadonnées avec cookies."""
    ydl_opts = get_base_ydl_opts()
    ydl_opts.update({
        "format":"all",
        'extract_flat': False,
        'skip_download': True,
        'check_formats': False,  # <-- Empêche yt-dlp d'échouer sur les tests de formats
        'socket_timeout': 15,
    })

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if not info:
                raise HTTPException(status_code=400, detail="URL invalide ou inaccessible.")

            if 'entries' in info:
                entries = []
                for entry in info.get('entries', []):
                    if entry:
                        entries.append({
                            "id": entry.get('id'),
                            "title": entry.get('title', 'Sans titre'),
                            "url": f"https://www.youtube.com/watch?v={entry.get('id')}",
                            "duration": format_duration(entry.get('duration')),
                            "thumbnail": entry.get('thumbnails')[-1]['url'] if entry.get('thumbnails') else None,
                        })
                return {
                    "type": "playlist",
                    "title": info.get('title', 'Playlist YouTube'),
                    "item_count": len(entries),
                    "videos": entries
                }

            formats_available = [
                {"id": "bestvideo[height<=1080]+bestaudio/best[height<=1080]", "label": "1080p FHD (MP4)", "type": "video", "ext": "mp4"},
                {"id": "bestvideo[height<=720]+bestaudio/best[height<=720]", "label": "720p HD (MP4)", "type": "video", "ext": "mp4"},
                {"id": "bestvideo[height<=480]+bestaudio/best[height<=480]", "label": "480p (MP4)", "type": "video", "ext": "mp4"},
                {"id": "bestvideo[height<=360]+bestaudio/best[height<=360]", "label": "360p (MP4)", "type": "video", "ext": "mp4"},
                {"id": "bestaudio/best", "label": "Audio MP3 (320 kbps)", "type": "audio", "ext": "mp3"}
            ]

            return {
                "type": "video",
                "id": info.get('id'),
                "title": info.get('title', 'Vidéo sans titre'),
                "channel": info.get('uploader', 'Chaîne inconnue'),
                "duration": format_duration(info.get('duration')),
                "thumbnail": info.get('thumbnail'),
                "formats": formats_available
            }
    except Exception as e:
        error_cleaned = clean_error_message(str(e))
        raise HTTPException(status_code=400, detail=f"Erreur d'analyse : {error_cleaned}")

def _run_download_task(task_id: str, url: str, format_id: str, ext: str):
    """Exécution sécurisée du téléchargement avec cookies."""
    with download_semaphore:
        temp_dir = tempfile.mkdtemp(prefix="ytsavex_")
        set_task_temp_dir(task_id, temp_dir)
        output_template = os.path.join(temp_dir, "%(id)s.%(ext)s")

        last_write_time = 0.0

        def progress_hook(d):
            nonlocal last_write_time
            now = time.time()

            if d['status'] == 'downloading':
                if (now - last_write_time) < PROGRESS_THROTTLE_SECONDS:
                    return

                last_write_time = now
                total = d.get('total_bytes') or d.get('total_bytes_estimate') or 0
                downloaded = d.get('downloaded_bytes') or 0
                percent = (downloaded / total * 100) if total > 0 else 0
                speed = d.get('speed') or 0
                eta = d.get('eta') or 0

                speed_str = f"{round(speed / (1024 * 1024), 2)} MB/s" if speed else "N/A"
                eta_str = f"{eta}s" if eta else "calcul..."

                update_task_progress(
                    task_id=task_id,
                    status="downloading",
                    percent=round(percent, 1),
                    speed=speed_str,
                    eta=eta_str
                )
            elif d['status'] == 'finished':
                update_task_progress(
                    task_id=task_id,
                    status="converting",
                    percent=95.0,
                    speed="Conversion FFmpeg",
                    eta="Finalisation..."
                )

        ydl_opts = get_base_ydl_opts()
        ydl_opts.update({
            'outtmpl': output_template,
            'progress_hooks': [progress_hook],
        })

# Sélecteur universel tout-terrain
        if ext == "mp3":
            ydl_opts.update({
                'format': 'ba/b/best', # ba = best audio, b = best (s'adapte à n'importe quel flux retourné)
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '320',
                }],
                'keepvideo': False,
            })
        else:
            # Sélecteur vidéo avec repli intelligent
            if not format_id or format_id == "best":
                chosen_format = "bv*+ba/b/best"
            else:
                chosen_format = f"{format_id}/bv*+ba/b/best"

            ydl_opts.update({
                'format': chosen_format,
                'merge_output_format': 'mp4',
            })

        try:
            update_task_progress(task_id, "starting", 5.0, "Connexion...", "")
            # LOG DE CONTRÔLE SUR RENDER
            print(f"[YTSaveX Engine] Démarrage extraction {url} avec cookies={os.path.exists(COOKIES_FILE_PATH)}")
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                raw_title = info.get('title', 'media')
                clean_title = "".join(c for c in raw_title if c.isalnum() or c in (' ', '-', '_')).strip()

            target_ext = f".{ext}"
            candidate_files = [f for f in glob.glob(os.path.join(temp_dir, "*")) if f.endswith(target_ext)]
            if not candidate_files:
                candidate_files = glob.glob(os.path.join(temp_dir, "*"))

            if not candidate_files:
                update_task_error(task_id, "Fichier de sortie introuvable.")
                return

            file_path = candidate_files[0]
            final_filename = f"{clean_title}.{ext}"
            media_type = 'audio/mpeg' if ext == 'mp3' else 'video/mp4'

            update_task_ready(task_id, file_path, final_filename, media_type)

        except Exception as e:
            update_task_error(task_id, str(e))


def start_download_job(url: str, format_id: str, ext: str) -> str:
    """Enregistre la tâche en base SQLite et démarre le thread."""
    task_id = str(uuid.uuid4())
    create_task(task_id)

    thread = threading.Thread(
        target=_run_download_task,
        args=(task_id, url, format_id, ext),
        daemon=True
    )
    thread.start()
    return task_id