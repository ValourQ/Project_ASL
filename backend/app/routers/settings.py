from fastapi import APIRouter, Depends

from app.services.settings_service import (
    get_settings,
    update_settings
)

from app.utils.auth_utils import get_current_user


router = APIRouter(

    prefix="/settings",

    tags=["Settings"]

)


@router.get("/")
def settings(

    user=Depends(get_current_user)

):

    return get_settings(user)


@router.put("/")
def update(

    data: dict,

    user=Depends(get_current_user)

):

    return update_settings(
        user,
        data
    )