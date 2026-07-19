"""
============================================================
SignSync

Runtime Manifest Generator

Scans the Runtime Animation Library and generates
a manifest describing every exported animation.

The manifest is used by:

• FastAPI
• Animation Loader
• React API
• Future Supabase uploads

Author:
SignSync
============================================================
"""

import json
import logging
from pathlib import Path
from typing import Dict

import numpy as np

from ml.config import paths


# ==========================================================
# Logger
# ==========================================================

logger = logging.getLogger(__name__)


# ==========================================================
# Runtime Information
# ==========================================================

from ml.runtime.constants import (
    SCHEMA_VERSION,
    RUNTIME_VERSION,
    COMPRESSION,
)


# ==========================================================
# Animation Metadata
# ==========================================================

def build_animation_metadata(
    animation_file: Path
) -> Dict:
    """
    Build metadata for a single animation.

    Parameters
    ----------
    animation_file

    Returns
    -------
    Dictionary containing runtime metadata.
    """

    animation = np.load(animation_file)

    frames = animation["frames"]

    metadata = {

        "file": animation_file.name,

        "frames": int(
            frames.shape[0]
        ),

        "landmarks": int(
            frames.shape[1]
        ),

        "coordinates": int(
            frames.shape[2]
        ),

        "dtype": str(
            frames.dtype
        ),

        "size_bytes": int(
            animation_file.stat().st_size
        ),

        "minimum": float(
            animation["minimum"]
        ),

        "maximum": float(
            animation["maximum"]
        )

    }

    animation.close()

    return metadata


# ==========================================================
# Runtime Library Scan
# ==========================================================

def scan_runtime_library() -> Dict:
    """
    Scan every runtime animation.

    Returns
    -------
    Dictionary of all runtime metadata.
    """

    logger.info("")
    logger.info("=" * 60)
    logger.info("Scanning Runtime Animation Library")
    logger.info("=" * 60)

    animation_directory = (
        paths.TEXT_TO_SIGN_ANIMATIONS
    )

    manifest = {

        "schema_version": SCHEMA_VERSION,

        "runtime_version": RUNTIME_VERSION,

        "compression": COMPRESSION,

        "words": {}

    }

    animation_files = sorted(

        animation_directory.glob(
            "*.npz"
        )

    )

    logger.info(
        "Found %d runtime animations.",
        len(animation_files)
    )

    for index, file in enumerate(

        animation_files,

        start=1

    ):

        word = file.stem

        manifest["words"][word] = (
            build_animation_metadata(
                file
            )
        )

        if (

            index % 200 == 0

            or

            index == len(animation_files)

        ):

            logger.info(

                "[%d/%d] indexed",

                index,

                len(animation_files)

            )

    return manifest

# ==========================================================
# Save Manifest
# ==========================================================

def save_manifest(
    manifest: Dict
) -> Path:
    """
    Save the runtime manifest as JSON.

    Parameters
    ----------
    manifest

    Returns
    -------
    Path to saved manifest.
    """

    output_file = paths.ANIMATION_MANIFEST

    output_file.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(

            manifest,

            file,

            indent=4,

            ensure_ascii=False

        )

    logger.info("")
    logger.info(
        "Manifest saved successfully."
    )

    logger.info(
        "Location : %s",
        output_file
    )

    return output_file


# ==========================================================
# Generate Manifest
# ==========================================================

def generate_manifest() -> Dict:
    """
    Generate the complete runtime manifest.

    Returns
    -------
    Manifest dictionary.
    """

    manifest = scan_runtime_library()

    save_manifest(
        manifest
    )

    logger.info("")
    logger.info("=" * 60)
    logger.info("Runtime Manifest Summary")
    logger.info("=" * 60)

    logger.info(
        "Schema Version  : %d",
        manifest["schema_version"]
    )

    logger.info(
        "Runtime Version : %s",
        manifest["runtime_version"]
    )

    logger.info(
        "Compression     : %s",
        manifest["compression"]
    )

    logger.info(
        "Animations      : %d",
        len(manifest["words"])
    )

    logger.info("=" * 60)

    return manifest


# ==========================================================
# Standalone Execution
# ==========================================================

if __name__ == "__main__":

    logging.basicConfig(

        level=logging.INFO,

        format="%(levelname)s | %(message)s"

    )

    generate_manifest()