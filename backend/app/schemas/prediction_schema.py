from typing import Optional

from pydantic import BaseModel, Field


class ImageRequest(BaseModel):
    """
    Request model for Sign → Text translation.

    Currently accepts a Base64 encoded image string.
    This can later be replaced with UploadFile when
    implementing image/video uploads.
    """

    image: str = Field(
        ...,
        description="Base64 encoded image"
    )


class PredictionResponse(BaseModel):
    """
    Response returned after a successful prediction.
    """

    prediction: str = Field(
        ...,
        description="Predicted ASL sign or text"
    )

    accuracy: float = Field(
        ...,
        ge=0,
        le=100,
        description="Prediction accuracy percentage"
    )

    latency: int = Field(
        ...,
        ge=0,
        description="Prediction latency in milliseconds"
    )

    timestamp: Optional[str] = Field(
        default=None,
        description="Prediction timestamp"
    )


class ErrorResponse(BaseModel):
    """
    Standard API error response.
    """

    detail: str = Field(
        ...,
        description="Error message"
    )