"""
============================================================
SignSync

Runtime Constants

Single source of truth for the Runtime Animation Library.

Every runtime module should import values from here
instead of hardcoding them.

Author:
SignSync
============================================================
"""

# ==========================================================
# Runtime Versions
# ==========================================================

SCHEMA_VERSION = 1

RUNTIME_VERSION = "1.0"


# ==========================================================
# Runtime Animation Format
# ==========================================================

COMPRESSION = "uint8"

DATA_TYPE = "uint8"


# ==========================================================
# Landmark Configuration
# ==========================================================

FACE_LANDMARKS = 478

POSE_LANDMARKS = 33

HAND_LANDMARKS = 21

RUNTIME_LANDMARKS = 75

COORDINATES = 3


# ==========================================================
# Runtime Cache
# ==========================================================

CACHE_ENABLED = True


# ==========================================================
# Manifest
# ==========================================================

MANIFEST_NAME = "animation_manifest.json"


# ==========================================================
# Runtime Library
# ==========================================================

LIBRARY_NAME = "SignSync Runtime Animation Library"

LIBRARY_VERSION = "1.0"