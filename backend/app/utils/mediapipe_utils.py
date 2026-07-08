import mediapipe as mp
import numpy as np


# Initialize MediaPipe Hands only once
mp_hands = mp.solutions.hands

hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    model_complexity=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)


def extract_hand_landmarks(image):
    """
    Extract 21 MediaPipe hand landmarks from an RGB image.

    Parameters
    ----------
    image : numpy.ndarray
        RGB image.

    Returns
    -------
    numpy.ndarray | None
        Array of shape (21, 3) containing
        x, y, z coordinates.

        Returns None if no hand is detected.
    """

    results = hands.process(image)

    if not results.multi_hand_landmarks:
        return None

    hand_landmarks = results.multi_hand_landmarks[0]

    landmarks = []

    for landmark in hand_landmarks.landmark:
        landmarks.append([
            landmark.x,
            landmark.y,
            landmark.z
        ])

    return np.array(landmarks)


def normalize_landmarks(landmarks):
    """
    Normalize landmarks so they are
    translation and scale invariant.

    Parameters
    ----------
    landmarks : numpy.ndarray
        Shape (21,3)

    Returns
    -------
    numpy.ndarray
        Normalized landmarks
    """

    wrist = landmarks[0]

    landmarks = landmarks - wrist

    max_distance = np.max(
        np.linalg.norm(landmarks, axis=1)
    )

    if max_distance != 0:
        landmarks = landmarks / max_distance

    return landmarks


def flatten_landmarks(landmarks):
    """
    Convert (21,3) landmarks into
    a feature vector of shape (63,)
    """

    return landmarks.flatten()


def extract_features(image):
    """
    Complete preprocessing pipeline.

    RGB Image
        ↓
    MediaPipe
        ↓
    21 Landmarks
        ↓
    Normalize
        ↓
    Flatten
        ↓
    (63,)
    """

    landmarks = extract_hand_landmarks(image)

    if landmarks is None:
        return None

    landmarks = normalize_landmarks(landmarks)

    features = flatten_landmarks(landmarks)

    return features