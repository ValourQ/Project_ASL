"""
============================================================
SignSync

Text → Sign Service

Business layer responsible for converting
English text into runtime sign language
animations.

Responsibilities

• Process user text
• Validate runtime vocabulary
• Load runtime animations
• Build animation sequences
• Generate API responses

Author:
SignSync
============================================================
"""

import logging
from dataclasses import dataclass, field
from typing import List

import numpy as np

from app.schemas.text_to_sign import (
    AnimationStep,
    TranslationRequest,
    TranslationResponse,
    TranslationStatistics,
)

from ml.loaders.animation_loader import (
    load_animation_sequence,
    load_manifest,
)

from ml.runtime.constants import (
    COORDINATES,
    LIBRARY_NAME,
    RUNTIME_LANDMARKS,
)

from ml.text_processing import (
    TextProcessingResult,
    process_text,
    processing_statistics,
)

# ==========================================================
# Logger
# ==========================================================

logger = logging.getLogger(__name__)

# ==========================================================
# Service Constants
# ==========================================================

SERVICE_NAME = "TextToSignService"


# ==========================================================
# Animation Sequence
# ==========================================================

@dataclass(slots=True)
class AnimationSequence:
    """
    Stores a sequence of runtime
    animations that will be sent
    to the frontend.
    """

    steps: List[AnimationStep] = field(
        default_factory=list
    )

    total_words: int = 0

    total_frames: int = 0

    def add(
        self,
        step: AnimationStep
    ) -> None:
        """
        Add one animation step.
        """

        self.steps.append(step)

        self.total_words += 1

        self.total_frames += step.frame_count

    def __iter__(self):
        return iter(self.steps)

    def __len__(self):
        return len(self.steps)


# ==========================================================
# Text To Sign Service
# ==========================================================

class TextToSignService:
    """
    Business logic layer for
    Text → Sign translation.
    """

    def __init__(self):

        logger.info(
            "Initializing TextToSignService..."
        )

        # Load manifest only once.
        self._manifest = load_manifest()

        logger.info(
            "Runtime library loaded (%d words).",
            len(self._manifest["words"])
        )

    # ======================================================
    # Animation Step
    # ======================================================

    def _create_animation_step(
        self,
        word: str,
        animation: np.ndarray
    ) -> AnimationStep:
        """
        Convert one runtime animation
        into an API model.
        """

        return AnimationStep(

            word=word,

            frame_count=int(
                animation.shape[0]
            ),

            landmark_count=RUNTIME_LANDMARKS,

            coordinate_count=COORDINATES,

            animation=animation.tolist()

        )

    # ======================================================
    # Animation Sequence
    # ======================================================

    def _create_sequence(
        self,
        words: List[str]
    ) -> AnimationSequence:
        """
        Load all runtime animations and
        build an AnimationSequence.
        """

        logger.info(
            "Loading runtime animations..."
        )

        runtime_animations = load_animation_sequence(
            words
        )

        sequence = AnimationSequence()

        for word in words:

            sequence.add(

                self._create_animation_step(

                    word,

                    runtime_animations[word]

                )

            )

        logger.info(
            "Animation sequence created."
        )

        logger.info(
            "Words  : %d",
            sequence.total_words
        )

        logger.info(
            "Frames : %d",
            sequence.total_frames
        )

        return sequence
    # ======================================================
    # Translation Statistics
    # ======================================================

    def _create_statistics(
        self,
        result: TextProcessingResult
    ) -> TranslationStatistics:
        """
        Build translation statistics from the
        preprocessing result.
        """

        stats = processing_statistics(
            result
        )

        return TranslationStatistics(

            total_words=stats[
                "total_words"
            ],

            recognized_words=stats[
                "recognized_words"
            ],

            unknown_words=stats[
                "unknown_words"
            ]

        )

# ======================================================
# Translation Response
# ======================================================

    def _create_response(
        self,
        request: TranslationRequest,
        result: TextProcessingResult,
        sequence: AnimationSequence,
        statistics: TranslationStatistics
    ) -> TranslationResponse:
        """
        Construct the API response returned
        to the frontend.
        """

        runtime = self.runtime_information()

        return TranslationResponse(

            success=True,

            input_text=request.text,

            normalized_text=result.normalized_text,

            recognized_words=result.valid_words,

            unknown_words=result.unknown_words,

            statistics=statistics,

            sequence=sequence.steps,

            runtime_version=runtime[
                "runtime_version"
            ],

            schema_version=runtime[
                "schema_version"
            ]

        )

    # ======================================================
    # Runtime Information
    # ======================================================

    def runtime_information(
        self
    ) -> dict:
        """
        Runtime configuration.
        """

        return {

            "library":
                LIBRARY_NAME,

            "runtime_version":
                self._manifest[
                    "runtime_version"
                ],

            "schema_version":
                self._manifest[
                    "schema_version"
                ],

            "compression":
                self._manifest[
                    "compression"
                ],

            "animation_count":
                len(
                    self._manifest[
                        "words"
                    ]
                ),

            "landmarks":
                RUNTIME_LANDMARKS,

            "coordinates":
                COORDINATES

        }

    # ======================================================
    # Runtime Statistics
    # ======================================================

    def runtime_statistics(
        self
    ) -> dict:
        """
        Runtime statistics used by
        the API layer.
        """

        info = self.runtime_information()

        return {

            "library":
                info["library"],

            "runtime_version":
                info["runtime_version"],

            "schema_version":
                info["schema_version"],

            "animation_count":
                info["animation_count"],

            "cache_enabled":
                True,

            "landmarks":
                info["landmarks"],

            "coordinates":
                info["coordinates"]

        }

    # ======================================================
    # Health
    # ======================================================

    def health(
        self
    ) -> dict:
        """
        Health endpoint information.
        """

        return {

            "status":
                "healthy",

            "service":
                SERVICE_NAME,

            "runtime":
                self.runtime_statistics()

        }
    # ======================================================
    # Translation Pipeline
    # ======================================================

    def translate(
        self,
        request: TranslationRequest
    ) -> TranslationResponse:
        """
        Translate English text into
        a runtime animation sequence.

        Pipeline

        User Input
            ↓
        Text Processing
            ↓
        Vocabulary Validation
            ↓
        Runtime Animation Loading
            ↓
        Animation Sequence
            ↓
        Response Generation
        """

        logger.info("")
        logger.info("=" * 60)
        logger.info(
            "Starting Text → Sign Translation"
        )
        logger.info("=" * 60)

        logger.info(
            "Input : %s",
            request.text
        )

        # --------------------------------------------------
        # Step 1
        # Text Processing
        # --------------------------------------------------

        result = process_text(
            request.text
        )

        logger.info(
            "Normalized : %s",
            result.normalized_text
        )

        logger.info(
            "Recognized Words : %d",
            len(result.valid_words)
        )

        logger.info(
            "Unknown Words : %d",
            len(result.unknown_words)
        )

        if result.unknown_words:

            logger.info(

                "Unknown Vocabulary : %s",

                ", ".join(
                    result.unknown_words
                )

            )

        # --------------------------------------------------
        # Step 2
        # Animation Loading
        # --------------------------------------------------

        sequence = self._create_sequence(

            result.valid_words

        )

        # --------------------------------------------------
        # Step 3
        # Statistics
        # --------------------------------------------------

        statistics = self._create_statistics(

            result

        )

        # --------------------------------------------------
        # Step 4
        # Build Response
        # --------------------------------------------------

        response = self._create_response(

            request=request,

            result=result,

            sequence=sequence,

            statistics=statistics

        )

        logger.info("")
        logger.info("=" * 60)
        logger.info("Translation Completed")
        logger.info("=" * 60)

        logger.info(

            "Animations : %d",

            len(sequence)

        )

        logger.info(

            "Frames : %d",

            sequence.total_frames

        )

        logger.info(

            "Runtime Version : %s",

            self._manifest[
                "runtime_version"
            ]

        )

        logger.info(

            "Schema Version : %d",

            self._manifest[
                "schema_version"
            ]

        )

        logger.info("=" * 60)

        return response

    # ======================================================
    # Service Summary
    # ======================================================

    def summary(
        self
    ) -> dict:
        """
        Return a high-level summary of
        the Text → Sign service.
        """

        runtime = self.runtime_statistics()

        return {

            "service":
                SERVICE_NAME,

            "status":
                "ready",

            "runtime":
                runtime,

            "features": [

                "Text Processing",

                "Vocabulary Validation",

                "Runtime Animation Loader",

                "Animation Sequence",

                "Translation Pipeline"

            ]

        }

# ==========================================================
# Singleton Service
# ==========================================================

_text_to_sign_service = TextToSignService()


def get_text_to_sign_service() -> TextToSignService:
    """
    Return the shared TextToSignService instance.

    A singleton avoids repeatedly loading
    runtime metadata and recreating service
    objects for every request.
    """

    return _text_to_sign_service


# ==========================================================
# Local Demonstration
# ==========================================================

def run_demo() -> None:
    """
    Demonstrate the complete Text → Sign
    translation pipeline.

    Intended for local development and
    debugging only.
    """

    logging.basicConfig(

        level=logging.INFO,

        format="%(levelname)s | %(message)s"

    )

    service = get_text_to_sign_service()

    examples = [

        "Hello",

        "Hello my friend",

        "Book computer drink",

        "Thank you",

        "How are you"

    ]

    logger.info("")
    logger.info("=" * 60)
    logger.info("SignSync Text → Sign Demo")
    logger.info("=" * 60)

    for sentence in examples:

        logger.info("")
        logger.info("-" * 60)

        request = TranslationRequest(

            text=sentence

        )

        response = service.translate(

            request

        )

        logger.info(

            "Input : %s",

            response.input_text

        )

        logger.info(

            "Normalized : %s",

            response.normalized_text

        )

        logger.info(

            "Recognized : %s",

            ", ".join(
                response.recognized_words
            ) if response.recognized_words
            else "None"

        )

        logger.info(

            "Unknown : %s",

            ", ".join(
                response.unknown_words
            ) if response.unknown_words
            else "None"

        )

        logger.info(

            "Animations : %d",

            len(response.sequence)

        )

        logger.info(

            "Frames : %d",

            sum(

                step.frame_count

                for step in response.sequence

            )

        )

    logger.info("")
    logger.info("=" * 60)
    logger.info("Runtime Summary")
    logger.info("=" * 60)

    summary = service.summary()

    logger.info(

        "Service : %s",

        summary["service"]

    )

    logger.info(

        "Status : %s",

        summary["status"]

    )

    runtime = service.runtime_information()

    logger.info(
        "Runtime Version : %s",
        runtime["runtime_version"]
    )

    logger.info(
        "Schema Version : %d",
        runtime["schema_version"]
    )

    logger.info(

        "Animations : %d",

        summary["runtime"]["animation_count"]

    )

    logger.info("=" * 60)
    logger.info("Demo completed successfully.")
    logger.info("=" * 60)


# ==========================================================
# Entry Point
# ==========================================================

if __name__ == "__main__":

    run_demo()