import os
import sqlite3
import time
from typing import Optional, Dict, Any, List

DB_PATH = os.path.join(os.path.dirname(__file__), "ytsavex.db")


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=20.0)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("PRAGMA synchronous=NORMAL;")
        
        # 1. Table des tâches
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                task_id TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                percent REAL DEFAULT 0.0,
                speed TEXT DEFAULT '',
                eta TEXT DEFAULT '',
                temp_dir TEXT,
                file_path TEXT,
                filename TEXT,
                media_type TEXT,
                error TEXT,
                created_at REAL NOT NULL,
                updated_at REAL NOT NULL
            );
        """)

        # 2. Table des paramètres dynamiques de l'admin
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );
        """)

        # Paramètres par défaut
        defaults = {
            "ads_enabled": "true",
            "ad_top_banner": "",
            "ad_mid_banner": "",
            "ad_popunder": "",
            "ga_tracking_id": "",
            "blacklisted_urls": "",
        }
        for k, v in defaults.items():
            cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)", (k, v))

        conn.commit()


# --- GESTION DES PARAMÈTRES ADMIN ---

def get_setting(key: str, default: str = "") -> str:
    with get_db_connection() as conn:
        row = conn.execute("SELECT value FROM settings WHERE key = ?", (key,)).fetchone()
        return row["value"] if row else default


def set_setting(key: str, value: str):
    with get_db_connection() as conn:
        conn.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (key, value))
        conn.commit()


def get_all_settings() -> Dict[str, str]:
    with get_db_connection() as conn:
        rows = conn.execute("SELECT key, value FROM settings").fetchall()
        return {r["key"]: r["value"] for r in rows}


def get_dashboard_stats() -> Dict[str, Any]:
    """Calcule les statistiques du service en temps réel."""
    now = time.time()
    today_start = now - (24 * 3600)

    with get_db_connection() as conn:
        total_tasks = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        completed_today = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'ready' AND created_at >= ?", (today_start,)
        ).fetchone()[0]
        failed_today = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'error' AND created_at >= ?", (today_start,)
        ).fetchone()[0]
        in_progress = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status IN ('starting', 'downloading', 'converting')"
        ).fetchone()[0]

        # 10 dernières tâches pour le journal
        recent_tasks = conn.execute("""
            SELECT task_id, status, filename, error, created_at 
            FROM tasks ORDER BY created_at DESC LIMIT 10
        """).fetchall()

        return {
            "total_tasks": total_tasks,
            "completed_today": completed_today,
            "failed_today": failed_today,
            "in_progress": in_progress,
            "recent_tasks": [dict(r) for r in recent_tasks],
        }


# --- GESTION DES TÂCHES ---

def create_task(task_id: str):
    now = time.time()
    with get_db_connection() as conn:
        conn.execute("""
            INSERT INTO tasks (task_id, status, percent, speed, eta, created_at, updated_at)
            VALUES (?, 'queued', 0.0, '0 MB/s', 'en file d''attente...', ?, ?)
        """, (task_id, now, now))
        conn.commit()


def update_task_progress(task_id: str, status: str, percent: float, speed: str, eta: str):
    now = time.time()
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE tasks
            SET status = ?, percent = ?, speed = ?, eta = ?, updated_at = ?
            WHERE task_id = ?
        """, (status, percent, speed, eta, now, task_id))
        conn.commit()


def update_task_ready(task_id: str, file_path: str, filename: str, media_type: str):
    now = time.time()
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE tasks
            SET status = 'ready', percent = 100.0, file_path = ?, filename = ?, media_type = ?, updated_at = ?
            WHERE task_id = ?
        """, (file_path, filename, media_type, now, task_id))
        conn.commit()


def update_task_error(task_id: str, error_msg: str):
    now = time.time()
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE tasks
            SET status = 'error', error = ?, updated_at = ?
            WHERE task_id = ?
        """, (error_msg, now, task_id))
        conn.commit()


def set_task_temp_dir(task_id: str, temp_dir: str):
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE tasks SET temp_dir = ?, updated_at = ? WHERE task_id = ?
        """, (temp_dir, time.time(), task_id))
        conn.commit()


def get_task(task_id: str) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        row = conn.execute("SELECT * FROM tasks WHERE task_id = ?", (task_id,)).fetchone()
        return dict(row) if row else None


def get_expired_or_stale_tasks(ttl_seconds: int = 900):
    cutoff = time.time() - ttl_seconds
    with get_db_connection() as conn:
        rows = conn.execute("""
            SELECT task_id, temp_dir FROM tasks WHERE created_at < ?
        """, (cutoff,)).fetchall()
        return [dict(r) for r in rows]


def delete_task(task_id: str):
    with get_db_connection() as conn:
        conn.execute("DELETE FROM tasks WHERE task_id = ?", (task_id,))
        conn.commit()


# Initialisation garantie au chargement
init_db()