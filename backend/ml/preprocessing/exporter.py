"""
============================================================
SignSync

Runtime Animation Exporter

Converts the research dataset into optimized runtime
animation assets used by the deployed application.

Pipeline

Animation Index
        +
Landmarks
        ↓
Runtime Optimizer
        ↓
Quantization
        ↓
book.npz
hello.npz
...

Author:
SignSync
============================================================
"""

import logging
from pathlib import Path
from typing import Dict, List

import numpy as np

from ml.config import paths


# ==========================================================
# Logger
# ==========================================================

logger = logging.getLogger(__name__)


# ==========================================================
# MediaPipe Landmark Layout
# ==========================================================

from ml.runtime.constants import (
    FACE_LANDMARKS,
    POSE_LANDMARKS,
    HAND_LANDMARKS,
)
POSE_START = FACE_LANDMARKS
POSE_END = POSE_START + POSE_LANDMARKS

LEFT_HAND_START = POSE_END
LEFT_HAND_END = LEFT_HAND_START + HAND_LANDMARKS

RIGHT_HAND_START = LEFT_HAND_END
RIGHT_HAND_END = RIGHT_HAND_START + HAND_LANDMARKS


# ==========================================================
# Runtime Landmark Selection
# ==========================================================

def filter_runtime_landmarks(animation: np.ndarray) -> np.ndarray:
    """
    Source layout:
      0–20    left hand
      21–41   right hand
      42–74   pose
      75–552  face

    Runtime layout:
      0–32    pose
      33–53  left hand
      54–74  right hand
    """
    animation = np.asarray(animation)

    if animation.ndim != 3 or animation.shape[1:] != (553, 3):
        raise ValueError(
            f"Expected animation shape (frames, 553, 3), got {animation.shape}"
        )

    left_hand = animation[:, 0:21, :].copy()
    right_hand = animation[:, 21:42, :].copy()
    pose = animation[:, 42:75, :].copy()

    # Hand datasets are local to each hand. Anchor their landmark 0
    # (hand wrist) to the matching MediaPipe pose wrist.
    left_hand += pose[:, 15:16, :] - left_hand[:, 0:1, :]
    right_hand += pose[:, 16:17, :] - right_hand[:, 0:1, :]

    return np.concatenate(
        [pose, left_hand, right_hand],
        axis=1,
    ).astype(np.float32)


# ==========================================================
# Runtime Normalization
# ==========================================================

from ml.runtime.constants import DATA_TYPE

def normalize_animation(
    animation: np.ndarray
) -> np.ndarray:
    """
    Normalize animation relative
    to the signer.

    Translation invariant.
    """

    animation = animation.astype(
        np.float32
    )

    # Use body center as origin

    body_center = animation.mean(
        axis=1,
        keepdims=True
    )

    animation = animation - body_center

    return animation


# ==========================================================
# Quantization
# ==========================================================

def quantize_animation(
    animation: np.ndarray
):
    """
    Convert float animation into uint8.

    Returns
    -------
    quantized frames

    minimum

    maximum
    """

    minimum = float(animation.min())

    maximum = float(animation.max())

    scale = maximum - minimum

    if scale == 0:

        scale = 1.0

    normalized = (

        animation - minimum

    ) / scale

    quantized = (

        normalized * 255

    ).round().astype(getattr(np, DATA_TYPE))

    return {

        "frames": quantized,

        "minimum": minimum,

        "maximum": maximum

    }


# ==========================================================
# Runtime Variant Selection
# ==========================================================

SPLIT_PRIORITY = {

    "train": 3,

    "val": 2,

    "test": 1

}


def choose_best_variant(
    variants: List[dict]
) -> dict:
    """
    Choose one runtime animation.

    Rules

    1. Prefer train split

    2. Then validation

    3. Then test

    4. If equal,
       choose shortest animation
    """

    best = None

    best_score = -1

    shortest = float("inf")

    for variant in variants:

        score = SPLIT_PRIORITY.get(

            variant["split"],

            0

        )

        frames = variant["frame_count"]

        if (

            score > best_score

            or

            (

                score == best_score

                and frames < shortest

            )

        ):

            best = variant

            best_score = score

            shortest = frames

    return best


# ==========================================================
# Runtime File Writer
# ==========================================================

def save_animation(
    output_file: Path,
    animation_data: dict
):
    """
    Save optimized runtime animation.
    """

    np.savez_compressed(

        output_file,

        frames=animation_data["frames"],

        minimum=animation_data["minimum"],

        maximum=animation_data["maximum"]

    )
# ==========================================================
# Runtime Export
# ==========================================================

def export_database(
    animation_index: Dict[str, List[dict]],
    landmarks
) -> None:
    """
    Export optimized runtime database.

    Parameters
    ----------
    animation_index

    landmarks
    """

    logger.info("")
    logger.info("=" * 60)
    logger.info("Exporting Runtime Animation Database")
    logger.info("=" * 60)

    output_dir = paths.TEXT_TO_SIGN_ANIMATIONS

    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    total_words = len(animation_index)

    exported = 0

    skipped = 0

    for index, (word, variants) in enumerate(

        sorted(animation_index.items()),

        start=1

    ):

        try:

            best = choose_best_variant(
                variants
            )

            landmark_key = best["landmark_key"]

            animation = landmarks[
                landmark_key
            ]

            animation = filter_runtime_landmarks(
                animation
            )

            animation = normalize_animation(
                animation
            )

            animation = quantize_animation(
                animation
            )

            output_file = (

                output_dir /

                f"{word}.npz"

            )

            save_animation(

                output_file,

                animation

            )

            exported += 1

        except Exception as error:

            skipped += 1

            logger.warning(

                "%s skipped (%s)",

                word,

                error

            )

        if (

            index % 100 == 0

            or

            index == total_words

        ):

            logger.info(

                "[%d/%d] exported",

                index,

                total_words

            )

    logger.info("")
    logger.info("=" * 60)
    logger.info("Export Summary")
    logger.info("=" * 60)

    logger.info(

        "Words exported : %d",

        exported

    )

    logger.info(

        "Words skipped  : %d",

        skipped

    )

    logger.info(

        "Output folder  : %s",

        output_dir

    )

    logger.info("=" * 60)