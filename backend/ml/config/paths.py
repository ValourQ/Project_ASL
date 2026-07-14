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

ANIMATIONS_DIR = ASSETS_DIR / "animations"

# ==========================================================
# Manifest
# ==========================================================

MANIFEST_FILE = ASSETS_DIR / "animation_manifest.json"