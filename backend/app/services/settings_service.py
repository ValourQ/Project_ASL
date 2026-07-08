from fastapi import HTTPException

from app.database import supabase

from app.utils.response import success


def get_settings(user):

    try:

        response = (
            supabase
            .table("user_settings")
            .select("*")
            .eq("user_id", user.id)
            .execute()
        )

        if response.data:

            return success(
                "Settings fetched successfully.",
                response.data[0]
            )

        default_settings = {

            "user_id": user.id,

            "theme": "light",

            "notifications": True,

            "auto_save": True,

            "camera_fps": 30,

            "preferred_input": "camera",

            "preferred_output": "text"

        }

        created = (
            supabase
            .table("user_settings")
            .insert(default_settings)
            .execute()
        )

        return success(
            "Default settings created.",
            created.data[0]
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def update_settings(user, updates: dict):

    try:

        response = (
            supabase
            .table("user_settings")
            .update(updates)
            .eq("user_id", user.id)
            .execute()
        )

        return success(
            "Settings updated successfully.",
            response.data
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )