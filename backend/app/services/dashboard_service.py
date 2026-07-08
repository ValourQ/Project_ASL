from fastapi import HTTPException

from app.database import supabase


def get_dashboard(user):

    try:

        history = (
            supabase
            .table("translation_history")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", desc=True)
            .execute()
        )

        saved = (
            supabase
            .table("saved_translations")
            .select("id")
            .eq("user_id", user.id)
            .execute()
        )

        sessions = history.data

        total_sessions = len(sessions)

        saved_sessions = len(saved.data)

        total_usage = sum(
            session["duration"] or 0
            for session in sessions
        )

        average_accuracy = 0

        if total_sessions > 0:
            average_accuracy = round(
                sum(
                    session["accuracy"]
                    for session in sessions
                ) / total_sessions,
                2
            )

        average_latency = 0

        if total_sessions > 0:
            average_latency = round(
                sum(
                    session["latency"]
                    for session in sessions
                ) / total_sessions,
                2
            )

        recent_sessions = sessions[:4]

        return {

            "success": True,

            "message": "Dashboard loaded successfully.",

            "data": {

                "total_sessions": total_sessions,

                "saved_sessions": saved_sessions,

                "signs_interpreted": total_sessions,

                "total_usage": total_usage,

                "average_accuracy": average_accuracy,

                "average_latency": average_latency,

                "recent_sessions": recent_sessions

            }

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )