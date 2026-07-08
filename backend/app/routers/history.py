from fastapi import APIRouter, Depends

from app.schemas.history_schema import SaveHistoryRequest

from app.services.history_service import (
    save_translation,
    get_history,
    get_recent_history,
    delete_history,
    clear_history
)

from app.utils.auth_utils import get_current_user


router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.post("/save")
def save_history(
    data: SaveHistoryRequest,
    user=Depends(get_current_user)
):
    return save_translation(
        user=user,
        mode=data.mode,
        input_type=data.input_type,
        input_text=data.input_text,
        output_text=data.output_text,
        accuracy=data.accuracy,
        latency=data.latency,
        duration=data.duration
    )


@router.get("/")
def fetch_history(
    user=Depends(get_current_user)
):
    return get_history(user)


@router.get("/recent")
def fetch_recent_history(
    limit: int = 5,
    user=Depends(get_current_user)
):
    return get_recent_history(
        user=user,
        limit=limit
    )


@router.delete("/{history_id}")
def remove_history(
    history_id: int,
    user=Depends(get_current_user)
):
    return delete_history(
        user,
        history_id
    )


@router.delete("/clear")
def remove_all_history(
    user=Depends(get_current_user)
):
    return clear_history(user) 