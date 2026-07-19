"""
============================================================
SignSync

Animation Database Builder

Main entry point for the Text → Sign preprocessing pipeline.

Pipeline
--------
1. Load & validate dataset
2. Build animation index
3. Export animation database
4. Generate manifest
5. Upload assets to Supabase (optional)

Author:
SignSync
============================================================
"""

import logging

from ml.preprocessing.dataset import load_dataset
from ml.preprocessing.animation_index import (
    build_animation_index,
    print_statistics
)
from ml.preprocessing.exporter import export_database
from ml.preprocessing.manifest import generate_manifest
# These will be enabled later
# from upload_supabase import upload_database


# ==========================================================
# Logger
# ==========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


# ==========================================================
# Main Pipeline
# ==========================================================

def main():

    logger.info("=" * 60)
    logger.info("SignSync Animation Database Pipeline")
    logger.info("=" * 60)

    # ------------------------------------------------------
    # Step 1 : Load Dataset
    # ------------------------------------------------------

    metadata, landmarks = load_dataset()

    logger.info(
        "Dataset loaded successfully (%d samples).",
        len(metadata)
    )

    # ------------------------------------------------------
    # Step 2 : Build Animation Index
    # ------------------------------------------------------

    animation_index = build_animation_index(
        metadata,
        landmarks
    )

    print_statistics(animation_index)

    logger.info(
        "Animation index contains %d supported words.",
        len(animation_index)
    )

    # ------------------------------------------------------
    #Step 3 : Export Runtime Database
    #-------------------------------------------------------

    export_database(
        animation_index,
        landmarks
    )

    # ------------------------------------------------------
    # Step 4 : Generate Manifest
    # ------------------------------------------------------

    generate_manifest()

    # ------------------------------------------------------
    # Step 5 : Upload to Supabase
    # ------------------------------------------------------

    # upload_database()

    logger.info("")
    logger.info("=" * 60)
    logger.info("Pipeline completed successfully.")
    logger.info("=" * 60)


# ==========================================================
# Entry Point
# ==========================================================

if __name__ == "__main__":
    main()