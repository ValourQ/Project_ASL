from typing import Optional

from pydantic import BaseModel


class UpdateSettingsRequest(BaseModel):

    theme: Optional[str] = None

    notifications: Optional[bool] = None

    auto_save: Optional[bool] = None

    camera_fps: Optional[int] = None

    preferred_input: Optional[str] = None

    preferred_output: Optional[str] = None