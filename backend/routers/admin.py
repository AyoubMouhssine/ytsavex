import os
from fastapi import APIRouter, HTTPException, Header, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional
from database import (
    get_all_settings,
    set_setting,
    get_dashboard_stats,
    get_setting
)

router = APIRouter(prefix="/api", tags=["Admin & Config"])

# Mot de passe admin par défaut (modifiable via la variable d'environnement ADMIN_KEY)
ADMIN_KEY = os.getenv("ADMIN_KEY", "admin123456")

# Chemin vers cookies.txt
COOKIES_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "cookies.txt")


def verify_admin(x_admin_key: Optional[str] = Header(None)):
    """Middleware d'authentification simple par clé secrète."""
    if not x_admin_key or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Accès non autorisé. Clé admin invalide.")
    return True


# --- ROUTE PUBLIQUE ACCESSIBLE PAR LE FRONTEND SANS MOT DE PASSE ---

@router.get("/config/public")
def get_public_config():
    """Fournit au frontend les bannières et codes d'analyse activés."""
    settings = get_all_settings()
    ads_on = settings.get("ads_enabled", "true").lower() == "true"

    return {
        "ads_enabled": ads_on,
        "ad_top_banner": settings.get("ad_top_banner", "") if ads_on else "",
        "ad_mid_banner": settings.get("ad_mid_banner", "") if ads_on else "",
        "ad_popunder": settings.get("ad_popunder", "") if ads_on else "",
        "ga_tracking_id": settings.get("ga_tracking_id", ""),
    }


# --- ROUTES PRIVÉES DASHBOARD (PROTÉGÉES) ---

class SettingsUpdateRequest(BaseModel):
    settings: Dict[str, str]
    cookies_content: Optional[str] = None


@router.post("/admin/login")
def admin_login(authorized: bool = Depends(verify_admin)):
    return {"status": "ok", "message": "Authentifié avec succès"}


@router.get("/admin/stats")
def get_stats(authorized: bool = Depends(verify_admin)):
    return get_dashboard_stats()


@router.get("/admin/settings")
def get_admin_settings(authorized: bool = Depends(verify_admin)):
    settings = get_all_settings()
    cookies_content = ""
    if os.path.exists(COOKIES_FILE_PATH):
        try:
            with open(COOKIES_FILE_PATH, "r", encoding="utf-8") as f:
                cookies_content = f.read()
        except Exception:
            pass

    return {
        "settings": settings,
        "cookies_content": cookies_content
    }


@router.post("/admin/settings")
def update_admin_settings(data: SettingsUpdateRequest, authorized: bool = Depends(verify_admin)):
    # 1. Sauvegarde des clés de config
    for key, val in data.settings.items():
        set_setting(key, val)

    # 2. Sauvegarde du fichier cookies.txt si modifié
    if data.cookies_content is not None:
        try:
            if data.cookies_content.strip():
                with open(COOKIES_FILE_PATH, "w", encoding="utf-8") as f:
                    f.write(data.cookies_content.strip())
            elif os.path.exists(COOKIES_FILE_PATH):
                os.remove(COOKIES_FILE_PATH)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erreur d'écriture cookies.txt: {e}")

    return {"status": "success", "message": "Configuration mise à jour"}