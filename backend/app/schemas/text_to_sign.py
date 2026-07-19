"""
============================================================
SignSync

Text → Sign Schemas

Defines request and response models for the
Text → Sign API.

These schemas are shared by

• FastAPI Routers
• Services
• Frontend
• Documentation (Swagger)

Author:
SignSync
============================================================
"""

from typing import List

from pydantic import BaseModel
from pydantic import Field


# ==========================================================
# Request
# ==========================================================

class TranslationRequest(BaseModel):
    """
    Text submitted by the user.
    """

    text: str = Field(

        ...,

        min_length=1,

        max_length=500,

        description="Sentence to translate."

    )


# ==========================================================
# Animation Step
# ==========================================================

class AnimationStep(BaseModel):
    """
    Represents one animation.
    """

    word: str

    frame_count: int

    landmark_count: int

    coordinate_count: int

    animation: List


# ==========================================================
# Processing Statistics
# ==========================================================

class TranslationStatistics(BaseModel):

    total_words: int

    recognized_words: int

    unknown_words: int
# ==========================================================
# Translation Response
# ==========================================================

class TranslationResponse(BaseModel):
    """
    Response returned after a successful
    Text → Sign translation.
    """

    success: bool

    input_text: str

    normalized_text: str

    recognized_words: List[str]

    unknown_words: List[str]

    statistics: TranslationStatistics

    sequence: List[AnimationStep]

    runtime_version: str

    schema_version: int


# ==========================================================
# Error Response
# ==========================================================

class ErrorResponse(BaseModel):
    """
    Standard API error response.
    """

    success: bool = False

    error: str

    detail: str | None = None


# ==========================================================
# Health Response
# ==========================================================

class RuntimeStatus(BaseModel):
    """
    Runtime library information.
    """

    library: str

    runtime_version: str

    schema_version: int

    animation_count: int

    cache_enabled: bool


# ==========================================================
# Example Payloads
# ==========================================================

TRANSLATION_REQUEST_EXAMPLE = {
    "text": "Hello my friend"
}

TRANSLATION_RESPONSE_EXAMPLE = {
    "success": True,
    "input_text": "Hello my friend",
    "normalized_text": "hello my friend",
    "recognized_words": [
        "hello",
        "my",
        "friend"
    ],
    "unknown_words": [],
    "statistics": {
        "total_words": 3,
        "recognized_words": 3,
        "unknown_words": 0
    },
    "sequence": [
        {
            "word": "hello",
            "frame_count": 31,
            "landmark_count": 75,
            "coordinate_count": 3,
            "animation": []
        },
        {
            "word": "my",
            "frame_count": 26,
            "landmark_count": 75,
            "coordinate_count": 3,
            "animation": []
        },
        {
            "word": "friend",
            "frame_count": 30,
            "landmark_count": 75,
            "coordinate_count": 3,
            "animation": []
        }
    ],
    "runtime_version": "1.0",
    "schema_version": 1
}

ERROR_RESPONSE_EXAMPLE = {
    "success": False,
    "error": "AnimationNotFound",
    "detail": "No animation available for the requested word."
}


# ==========================================================
# Pydantic Configuration
# ==========================================================

TranslationRequest.model_config = {
    "json_schema_extra": {
        "example": TRANSLATION_REQUEST_EXAMPLE
    }
}

TranslationResponse.model_config = {
    "json_schema_extra": {
        "example": TRANSLATION_RESPONSE_EXAMPLE
    }
}

ErrorResponse.model_config = {
    "json_schema_extra": {
        "example": ERROR_RESPONSE_EXAMPLE
    }
}