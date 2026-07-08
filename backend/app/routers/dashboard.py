from fastapi import APIRouter, Depends

from app.services.dashboard_service import get_dashboard

from app.utils.auth_utils import get_current_user


router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get("/")
def dashboard(

    user=Depends(get_current_user)

):

    return get_dashboard(user)