from fastapi import Header, HTTPException

from app.database import supabase


def get_current_user(
    authorization: str = Header(...)
):
    """
    Returns the currently authenticated user
    using the Supabase JWT access token.
    """

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header."
        )

    token = authorization.replace("Bearer ", "")

    try:

        response = supabase.auth.get_user(token)

        if response.user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found."
            )

        return response.user

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Authentication failed."
        )