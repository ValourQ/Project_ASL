from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class HistoryItem(BaseModel):
    id: int
    mode: str
    input_type: str
    input_text: Optional[str] = None
    output_text: str
    accuracy: float
    latency: int
    duration: Optional[int] = None
    created_at: datetime


class SaveHistoryRequest(BaseModel):
    user_id: str
    mode: str
    input_type: str
    input_text: Optional[str] = None
    output_text: str
    accuracy: float
    latency: int
    duration: Optional[int] = None 