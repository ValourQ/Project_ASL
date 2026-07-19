"""
============================================================
SignSync

Text → Sign Router

FastAPI endpoints for translating English
text into runtime sign language animations.

Responsibilities

• Validate incoming requests
• Delegate business logic to the service
• Return typed API responses
• Expose runtime information
• Provide health monitoring

Author:
SignSync
============================================================
"""

import logging

from fastapi import (
    APIRouter,
    HTTPException,
    status,
)

from app.schemas.text_to_sign import (
    RuntimeStatus,
    TranslationRequest,
    TranslationResponse,
)

from app.services.text_to_sign_service import (
    get_text_to_sign_service,
)

# ==========================================================
# Logger
# ==========================================================

logger = logging.getLogger(__name__)

# ==========================================================
# Router
# ==========================================================

router = APIRouter(

    prefix="/text-to-sign",

    tags=["Text → Sign"]

)

service = get_text_to_sign_service()

# ==========================================================
# Translate
# ==========================================================

@router.post(

    "/translate",

    response_model=TranslationResponse,

    summary="Translate Text",

    description=(
        "Translate English text into "
        "runtime sign language animations."
    )

)
def translate(
    request: TranslationRequest
) -> TranslationResponse:
    """
    Translate user text into
    sign language animations.
    """

    logger.info(

        "POST /text-to-sign/translate"

    )

    try:

        return service.translate(
            request
        )

    except ValueError as error:

        logger.warning(

            "Validation failed: %s",

            error

        )

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail=str(error)

        )

    except Exception:

        logger.exception(

            "Unexpected translation error."

        )

        raise HTTPException(

            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,

            detail="Internal server error."

        )

# ==========================================================
# Runtime Information
# ==========================================================

@router.get(

    "/runtime",

    response_model=RuntimeStatus,

    summary="Runtime Information",

    description=(
        "Return runtime animation "
        "library information."
    )

)
def runtime_information() -> RuntimeStatus:
    """
    Return runtime library information.
    """

    logger.info(

        "GET /text-to-sign/runtime"

    )

    info = service.runtime_statistics()

    return RuntimeStatus(

        library=info["library"],

        runtime_version=info[
            "runtime_version"
        ],

        schema_version=info[
            "schema_version"
        ],

        animation_count=info[
            "animation_count"
        ],

        cache_enabled=info[
            "cache_enabled"
        ]

    )
# ==========================================================
# Health Check
# ==========================================================

@router.get(

    "/health",

    summary="Health Check",

    description=(
        "Verify that the Text → Sign "
        "service is healthy and ready."
    )

)
def health() -> dict:
    """
    Service health endpoint.
    """

    logger.info(

        "GET /text-to-sign/health"

    )

    return service.health()


# ==========================================================
# Supported Words
# ==========================================================

@router.get(

    "/supported-words",

    summary="Supported Vocabulary",

    description=(
        "Return information about the "
        "runtime animation vocabulary."
    )

)
def supported_words() -> dict:
    """
    Runtime vocabulary information.
    """

    logger.info(

        "GET /text-to-sign/supported-words"

    )

    runtime = service.runtime_statistics()

    return {

        "supported_words":
            runtime["animation_count"],

        "runtime_version":
            runtime["runtime_version"],

        "schema_version":
            runtime["schema_version"]

    }


# ==========================================================
# Service Summary
# ==========================================================

@router.get(

    "/summary",

    summary="Service Summary",

    description=(
        "Return a high-level summary of "
        "the Text → Sign service."
    )

)
def summary() -> dict:
    """
    Service summary.
    """

    logger.info(

        "GET /text-to-sign/summary"

    )

    return service.summary()


# ==========================================================
# API Information
# ==========================================================

@router.get(

    "/",

    summary="API Information",

    description=(
        "Basic information about the "
        "Text → Sign API."
    )

)
def information() -> dict:
    """
    Root endpoint for the
    Text → Sign API.
    """

    logger.info(

        "GET /text-to-sign/"

    )

    runtime = service.runtime_statistics()

    return {

        "service":
            "SignSync Text → Sign API",

        "status":
            "running",

        "runtime_version":
            runtime["runtime_version"],

        "schema_version":
            runtime["schema_version"],

        "supported_words":
            runtime["animation_count"],

        "endpoints": {

            "translate":
                "/text-to-sign/translate",

            "runtime":
                "/text-to-sign/runtime",

            "health":
                "/text-to-sign/health",

            "supported_words":
                "/text-to-sign/supported-words",

            "summary":
                "/text-to-sign/summary"

        }

    }
