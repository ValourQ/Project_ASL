"""
============================================================
SignSync Backend

Application Entry Point

Initializes the FastAPI application,
configures middleware, registers routers,
and exposes system endpoints.

Author:
SignSync
============================================================
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    auth,
    dashboard,
    history,
    saved,
    settings,
    translator,
    text_to_sign,
)

# ==========================================================
# Logging
# ==========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)

# ==========================================================
# FastAPI Application
# ==========================================================

app = FastAPI(

    title="SignSync API",

    description="""
AI-powered American Sign Language Translation Platform.

Features

• Sign → Text Translation

• Text → Sign Translation

• Translation History

• Saved Translations

• User Dashboard

• Authentication
""",

    version="1.0.0",

    contact={
        "name": "SignSync Team"
    },

    license_info={
        "name": "MIT"
    },

    docs_url="/docs",

    redoc_url="/redoc",

)

# ==========================================================
# CORS
# ==========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# ==========================================================
# Routers
# ==========================================================

app.include_router(auth.router)

app.include_router(translator.router)

app.include_router(text_to_sign.router)

app.include_router(history.router)

app.include_router(saved.router)

app.include_router(dashboard.router)

app.include_router(settings.router)

# ==========================================================
# Startup
# ==========================================================

@app.on_event("startup")
async def startup() -> None:

    logger.info("")
    logger.info("=" * 60)
    logger.info("SignSync Backend Started Successfully")
    logger.info("Swagger UI : http://127.0.0.1:8000/docs")
    logger.info("=" * 60)

# ==========================================================
# Root Endpoint
# ==========================================================

@app.get(
    "/",
    tags=["System"]
)
async def home():

    return {

        "application":
            "SignSync",

        "version":
            "1.0.0",

        "status":
            "running",

        "documentation":
            "/docs",

        "health":
            "/health"

    }

# ==========================================================
# Health Check
# ==========================================================

@app.get(
    "/health",
    tags=["System"]
)
async def health():

    return {

        "status":
            "healthy",

        "application":
            "SignSync",

        "version":
            "1.0.0"

    }