from fastapi import APIRouter, Depends

from app.services.saved_service import (
    save_translation,
    get_saved,
    remove_saved
)

from app.utils.auth_utils import get_current_user


router = APIRouter(
    prefix="/saved",
    tags=["Saved"]
)


@router.post("/{history_id}")
def save(
    history_id: int,
    user=Depends(get_current_user)
):

    return save_translation(
        user,
        history_id
    )


@router.get("/")
def fetch_saved(
    user=Depends(get_current_user)
):

    return get_saved(user)


@router.delete("/{saved_id}")
def delete_saved(
    saved_id: int,
    user=Depends(get_current_user)
):

    return remove_saved(
        user,
        saved_id
    )