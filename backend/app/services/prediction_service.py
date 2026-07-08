import time
from datetime import datetime


def predict_sign(image: str):
    """
    Temporary prediction service.

    Current workflow:
    -----------------
    1. Receive Base64 image from frontend.
    2. Return dummy prediction.

    Future workflow:
    ----------------
    1. Decode Base64 image.
    2. Process image using OpenCV.
    3. Detect hand landmarks using MediaPipe.
    4. Load Random Forest model.
    5. Predict ASL sign.
    6. Save prediction to Supabase.
    7. Return prediction response.
    """

    start_time = time.perf_counter()

    # =====================================================
    # TODO: Decode Base64 image
    # =====================================================

    # =====================================================
    # TODO: Extract hand landmarks using MediaPipe
    # =====================================================

    # =====================================================
    # TODO: Load Random Forest model and predict
    # =====================================================

    prediction = "A"
    accuracy = 98.7

    # =====================================================
    # Calculate latency
    # =====================================================

    latency = round((time.perf_counter() - start_time) * 1000)

    # =====================================================
    # TODO: Save prediction to Supabase
    # =====================================================

    return {
        "prediction": prediction,
        "accuracy": accuracy,
        "latency": latency,
        "timestamp": datetime.now().isoformat()
    }