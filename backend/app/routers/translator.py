from fastapi import APIRouter

from app.schemas.prediction_schema import (
    ImageRequest,
    PredictionResponse
)
from app.services.prediction_service import predict_sign

router = APIRouter(
    prefix="/translator",
    tags=["Translator"]
)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(data: ImageRequest):
    return predict_sign(data.image)