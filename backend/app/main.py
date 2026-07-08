from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    auth,
    dashboard,
    history,
    saved,
    settings,
    translator,
)

app = FastAPI(
    title="SignSync API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(translator.router)
app.include_router(history.router)
app.include_router(saved.router)
app.include_router(dashboard.router)
app.include_router(settings.router)


@app.get("/")
def home():
    return {
        "message": "SignSync Backend Running"
    }