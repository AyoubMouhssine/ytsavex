from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from database import get_task
from services.youtube_service import (
    get_video_info,
    start_download_job,
    cleanup_task_file
)

router = APIRouter(prefix="/api", tags=["Downloader"])


@router.get("/info")
def info_endpoint(url: str = Query(..., description="URL YouTube à analyser")):
    return get_video_info(url)


@router.api_route("/download/start", methods=["GET", "POST"])
def start_download(
    url: str = Query(..., description="Lien de la vidéo"),
    format_id: str = Query(default="best", description="Identifiant du format sélectionné"),
    ext: str = Query(default="mp4", description="Extension mp4 ou mp3")
):
    """Démarre le job de téléchargement et renvoie l'identifiant unique."""
    try:
        task_id = start_download_job(url, format_id, ext)
        return {"task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/progress/{task_id}")
def get_task_progress(task_id: str):
    """Renvoie l'avancement en direct avec statut d'attente ou d'erreur."""
    task = get_task(task_id)
    if not task:
        return {"status": "error", "error": "Tâche expirée ou introuvable"}

    return {
        "status": task.get("status", "starting"),
        "percent": task.get("percent", 0),
        "speed": task.get("speed", ""),
        "eta": task.get("eta", ""),
        "error": task.get("error", None)
    }


@router.get("/download/file/{task_id}")
def get_ready_file(task_id: str):
    """Sert le fichier et planifie sa suppression immédiate du disque."""
    task = get_task(task_id)
    if not task or task.get("status") != "ready":
        raise HTTPException(status_code=400, detail="Le fichier n'est pas prêt ou a expiré.")

    # Nettoyage programmé via BackgroundTask dès que le stream de réponse HTTP se termine
    return FileResponse(
        path=task["file_path"],
        filename=task["filename"],
        media_type=task["media_type"],
        background=BackgroundTask(cleanup_task_file, task_id)
    )