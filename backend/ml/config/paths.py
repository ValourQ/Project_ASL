"""
============================================================
SignSync

Project Paths

Central location for all filesystem paths used by the
ML pipeline.

Author: SignSync
============================================================
"""

from pathlib import Path

# ==========================================================
# Project Root
# ==========================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

# ==========================================================
# Dataset
# ==========================================================

DATASET_DIR = PROJECT_ROOT / "datasets" / "mutemotion"

LANDMARK_FILE = DATASET_DIR / "landmarks_V3.npz"

METADATA_FILE = DATASET_DIR / "WLASL_parsed_data.json"

LABEL_FILE = DATASET_DIR / "labels.npz"

FILTERED_LABELS = DATASET_DIR / "filtered_labels.txt"

# ==========================================================
# Assets
# ==========================================================

ASSETS_DIR = PROJECT_ROOT / "backend" / "assets"

# ----------------------------------------------------------
# Text → Sign Runtime Assets
# ----------------------------------------------------------

TEXT_TO_SIGN_DIR = ASSETS_DIR / "text_to_sign"

TEXT_TO_SIGN_ANIMATIONS = TEXT_TO_SIGN_DIR / "animations"

TEXT_TO_SIGN_MANIFESTS = TEXT_TO_SIGN_DIR / "manifests"

TEXT_TO_SIGN_AVATARS = TEXT_TO_SIGN_DIR / "avatars"

ANIMATION_MANIFEST = (
    TEXT_TO_SIGN_MANIFESTS /
    "animation_manifest.json"
)

# ----------------------------------------------------------
# Sign → Text Runtime Assets
# ----------------------------------------------------------

SIGN_TO_TEXT_DIR = ASSETS_DIR / "sign_to_text"

SIGN_TO_TEXT_MODELS = SIGN_TO_TEXT_DIR / "models"

SIGN_TO_TEXT_LABELS = SIGN_TO_TEXT_DIR / "labels"

SIGN_TO_TEXT_PREPROCESSORS = (
    SIGN_TO_TEXT_DIR /
    "preprocessors"
)