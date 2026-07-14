"""
============================================================
SignSync

Animation Index Builder

Builds a lookup index that maps every ASL gloss to all
available animation variants.

This module does NOT:

- load datasets
- export files
- upload to Supabase

It only builds the animation index.

Author:
SignSync
============================================================
"""

from collections import defaultdict
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)


def build_animation_index(
    metadata: List[dict],
    landmarks
) -> Dict[str, List[dict]]:
    """
    Build animation lookup table.

    Parameters
    ----------
    metadata
        Parsed WLASL metadata.

    landmarks
        Loaded landmark dataset.

    Returns
    -------
    dict
        Animation lookup dictionary.
    """

    logger.info("Building animation index...")

    animation_index = defaultdict(list)

    total_samples = len(metadata)

    for sample_index, sample in enumerate(metadata):

        gloss = sample["gloss"].strip().lower()

        landmark_key = landmarks.files[sample_index]

        frames = landmarks[landmark_key]

        animation_index[gloss].append({

            "variant": len(animation_index[gloss]),

            "landmark_key": landmark_key,

            "frame_count": int(frames.shape[0]),

            "landmark_count": int(frames.shape[1]),

            "coordinate_count": int(frames.shape[2]),

            "video_path": sample["video_path"],

            "frame_start": sample["frame_start"],

            "frame_end": sample["frame_end"],

            "split": sample["split"]

        })

    logger.info(
        "Indexed %d words from %d samples.",
        len(animation_index),
        total_samples
    )

    return dict(animation_index)


def get_variants(
    animation_index: Dict[str, List[dict]],
    word: str
) -> List[dict]:
    """
    Return all variants for a word.
    """

    return animation_index.get(
        word.lower(),
        []
    )


def print_statistics(
    animation_index: Dict[str, List[dict]]
) -> None:
    """
    Print summary statistics.
    """

    total_words = len(animation_index)

    total_variants = sum(

        len(v)

        for v in animation_index.values()

    )

    print("\n" + "=" * 60)
    print("Animation Index Summary")
    print("=" * 60)

    print(f"Supported Words : {total_words:,}")
    print(f"Variants        : {total_variants:,}")

    print("\nTop 10 Words\n")

    sorted_words = sorted(

        animation_index.items(),

        key=lambda x: len(x[1]),

        reverse=True

    )

    for word, variants in sorted_words[:10]:

        print(

            f"{word:<20}"

            f"{len(variants)} variants"

        )

    print("=" * 60)