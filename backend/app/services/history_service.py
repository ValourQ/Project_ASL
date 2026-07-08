from fastapi import HTTPException

from app.database import supabase


def save_translation(
    user,
    mode: str,
    input_type: str,
    input_text: str | None,
    output_text: str,
    accuracy: float,
    latency: int,
    duration: int | None = None,
):

    try:

        response = (
            supabase.table("translation_history")
            .insert(
                {
                    "user_id": user.id,
                    "mode": mode,
                    "input_type": input_type,
                    "input_text": input_text,
                    "output_text": output_text,
                    "accuracy": accuracy,
                    "latency": latency,
                    "duration": duration,
                }
            )
            .execute()
        )

        return {
            "success": True,
            "message": "Translation saved successfully.",
            "translation": response.data,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def get_history(user):

    try:

        response = (
            supabase.table("translation_history")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def get_recent_history(
    user,
    limit: int = 5
):

    try:

        response = (
            supabase.table("translation_history")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def delete_history(
    user,
    history_id: int
):

    try:

        (
            supabase.table("translation_history")
            .delete()
            .eq("id", history_id)
            .eq("user_id", user.id)
            .execute()
        )

        return {
            "success": True,
            "message": "History deleted successfully."
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


def clear_history(user):

    try:

        (
            supabase.table("translation_history")
            .delete()
            .eq("user_id", user.id)
            .execute()
        )

        return {
            "success": True,
            "message": "History cleared successfully."
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )