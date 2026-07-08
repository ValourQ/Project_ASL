import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

UPLOAD_FOLDER = "uploads"

MODEL_PATH = "ml/models/random_forest.pkl"

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/jpg"
}

MAX_FILE_SIZE = 5 * 1024 * 1024