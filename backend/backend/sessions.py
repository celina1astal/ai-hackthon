"""In-memory sessions. Each session keeps chat history, language, and the agent's own state."""

_sessions: dict[str, dict] = {}


def get(session_id: str) -> dict:
    if session_id not in _sessions:
        _sessions[session_id] = {
            "id": session_id,    # used as the LangGraph thread_id
            "language": "en",
            "history": [],       # [{"role": "user"/"assistant", "content": "..."}]  (English)
        }
    return _sessions[session_id]


def delete(session_id: str):
    _sessions.pop(session_id, None)
