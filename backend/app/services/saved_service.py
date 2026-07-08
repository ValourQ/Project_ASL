from fastapi import HTTPException

from app.database import supabase


def save_translation(user, history_id: int):

    try:

        existing = (
            supabase
            .table("saved_translations")
            .select("id")
            .eq("user_id", user.id)
            .eq("history_id", history_id)
            .execute()
        )

        if existing.data:

            return {
                "success": False,
                "message": "Translation already saved.",
                "data": None
            }

        response = (
            supabase
            .table("saved_translations")
            .insert(
                {
                    "user_id": user.id,
                    "history_id": history_id
                }
            )
            .execute()
        )

        return {
            "success": True,
            "message": "Translation saved successfully.",
            "data": response.data
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def get_saved(user):

    try:

        response = (
            supabase
            .table("saved_translations")
            .select(
                """
                id,
                created_at,
                translation_history(
                    id,
                    mode,
                    input_type,
                    input_text,
                    output_text,
                    accuracy,
                    latency,
                    duration,
                    created_at
                )
                """
            )
            .eq("user_id", user.id)
            .order("created_at", desc=True)
            .execute()
        )

        return {
            "success": True,
            "message": "Saved translations fetched successfully.",
            "data": response.data
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def remove_saved(user, saved_id: int):

    try:

        (
            supabase
            .table("saved_translations")
            .delete()
            .eq("id", saved_id)
            .eq("user_id", user.id)
            .execute()
        )

        return {
            "success": True,
            "message": "Saved translation removed."
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )