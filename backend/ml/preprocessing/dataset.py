"""
============================================================
SignSync
Dataset Module

This module is responsible for:

• Validating the dataset
• Loading metadata
• Loading landmark data
• Creating output directories
• Returning reusable dataset objects

Every preprocessing module imports this file instead of
duplicating dataset loading logic.

Author:
SignSync
============================================================
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np

from ml.config import paths
from ml.config import settings


# ==========================================================
# Logger
# ==========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


# ==========================================================
# Validation
# ==========================================================

def validate_dataset() -> None:
    """
    Verify that the required dataset files exist.
    """

    logger.info("Checking dataset...")

    required_files = [
        paths.LANDMARK_FILE,
        paths.METADATA_FILE,
    ]

    missing = []

    for file in required_files:

        if file.exists():

            logger.info("✓ %s", file.name)

        else:

            logger.error("✗ %s", file.name)

            missing.append(file)

    if missing:

        raise FileNotFoundError(
            "\nRequired dataset files are missing."
        )

    paths.ANIMATIONS_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


# ==========================================================
# Metadata
# ==========================================================

def load_metadata() -> List[Dict]:
    """
    Load WLASL metadata.
    """

    logger.info("Loading metadata...")

    with open(
        paths.METADATA_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        metadata = json.load(file)

    logger.info(
    f"Loaded {len(metadata):,} metadata entries."
    )

    return metadata


# ==========================================================
# Landmark Dataset
# ==========================================================

def load_landmarks() -> np.lib.npyio.NpzFile:
    """
    Load landmark dataset.
    """

    logger.info("Loading landmark dataset...")

    landmarks = np.load(
        paths.LANDMARK_FILE,
        allow_pickle=True
    )

    logger.info(
    f"Loaded {len(landmarks.files):,} landmark samples."
)

    return landmarks


# ==========================================================
# Complete Dataset
# ==========================================================

def load_dataset() -> Tuple[List[Dict], np.lib.npyio.NpzFile]:
    """
    Validate and load the complete dataset.

    Returns
    -------
    metadata

    landmarks
    """

    validate_dataset()

    metadata = load_metadata()

    landmarks = load_landmarks()

    if len(metadata) != len(landmarks.files):

        raise ValueError(
            "Metadata count does not match landmark count."
        )

    logger.info("Dataset loaded successfully.")

    return metadata, landmarks


# ==========================================================
# Output Directory
# ==========================================================

def get_output_directory() -> Path:
    """
    Return animation output directory.
    """

    paths.ANIMATIONS_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    return paths.ANIMATIONS_DIR