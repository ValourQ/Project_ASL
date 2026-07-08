from fastapi import HTTPException

from app.database import supabase


def signup_user(full_name: str, email: str, password: str):

    try:

        response = supabase.auth.sign_up(
            {
                "email": email,
                "password": password
            }
        )

        if response.user is None:
            raise HTTPException(
                status_code=400,
                detail="Unable to create account."
            )

        supabase.table("profiles").insert(
            {
                "id": response.user.id,
                "full_name": full_name,
                "email": email
            }
        ).execute()

        supabase.table("user_settings").insert(
            {
                "user_id": response.user.id
            }
        ).execute()

        return {
            "success": True,
            "message": "Account created successfully."
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


def login_user(email: str, password: str):

    try:

        response = supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password
            }
        )

        if response.session is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        return {
            "success": True,
            "message": "Login successful.",
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "user": {
                "id": response.user.id,
                "email": response.user.email
            }
        }

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )


def forgot_password(email: str):

    try:

        supabase.auth.reset_password_email(email)

        return {
            "success": True,
            "message": "Password reset email sent."
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


def logout_user():

    return {
        "success": True,
        "message": "Remove the stored JWT token on the client to log out."
    }


def get_profile(user):

    try:

        response = (
            supabase
            .table("profiles")
            .select("*")
            .eq("id", user.id)
            .single()
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )