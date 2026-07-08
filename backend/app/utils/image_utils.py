import base64
import cv2
import numpy as np


def decode_base64_image(image_string: str):
    """
    Decode a Base64 encoded image into an OpenCV image.

    Parameters
    ----------
    image_string : str
        Base64 encoded image string.

    Returns
    -------
    numpy.ndarray
        OpenCV BGR image.
    """

    # Remove Base64 header if present
    if "," in image_string:
        image_string = image_string.split(",")[1]

    image_bytes = base64.b64decode(image_string)

    image_array = np.frombuffer(image_bytes, dtype=np.uint8)

    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    return image


def resize_image(image, width=640, height=480):
    """
    Resize image to a fixed size.
    """

    return cv2.resize(image, (width, height))


def convert_bgr_to_rgb(image):
    """
    Convert OpenCV BGR image to RGB.
    """

    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)