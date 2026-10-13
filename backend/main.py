import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.downloader import router as downloader_router
from routers.admin import router as admin_router      # <-- AJOUTER ICI

app = FastAPI(
    title="YTSaveX API",
    description="API haute performance pour l'extraction et la conversion de médias YouTube.",
    version="1.1.0"
)

# En production, vous pourrez restreindre les origines via la variable d'environnement FRONTEND_URL
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(downloader_router)
app.include_router(admin_router) 


@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "YTSaveX Engine",
        "version": "1.3.0",
        "storage": "SQLite WAL"
    }