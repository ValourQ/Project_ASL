from fastapi import APIRouter, Depends

from app.schemas.auth_schema import (
    SignUpRequest,
    LoginRequest,
    ForgotPasswordRequest
)

from app.services.auth_service import (
    signup_user,
    login_user,
    forgot_password,
    logout_user,
    get_profile
)

from app.utils.auth_utils import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(data: SignUpRequest):

    return signup_user(
        full_name=data.full_name,
        email=data.email,
        password=data.password
    )


@router.post("/login")
def login(data: LoginRequest):

    return login_user(
        email=data.email,
        password=data.password
    )


@router.post("/forgot-password")
def forgot(data: ForgotPasswordRequest):

    return forgot_password(
        data.email
    )


@router.post("/logout")
def logout():

    return logout_user()


@router.get("/me")
def me(
    user=Depends(get_current_user)
):

    return get_profile(user)