from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from . import sessions

from .agent_adapter import run_agent, find_provision, status
from .language import SUPPORTED, detect_language, to_english, from_english
from .letters import build_letter_text, save_letter, LETTER_DIR
from .schemas import (ChatRequest, ChatResponse, LetterLinks,
                     GrievanceRequest, GrievanceResponse)

app = FastAPI(title="Cooperative & Legal Helpdesk - Backend")

# Lets Person 4's frontend (Vite runs on :5173) call this API
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/health")
def health():
    return {"status": "ok", **status()}   # {"agents": true/false, "rag": true/false}


@app.get("/languages")
def languages():
    return SUPPORTED


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    session = sessions.get(req.session_id)

    # 1. Language: dropdown choice wins, otherwise auto-detect
    lang = req.language if req.language in SUPPORTED else detect_language(req.message, session["language"])
    session["language"] = lang

    # 2. User message -> English
    message_en = to_english(req.message, lang)
    session["history"].append({"role": "user", "content": message_en})

    # 3. Agents + RAG
    try:
        result = run_agent(message_en, session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent error: {e}")

    reply_en = result["reply"]
    session["history"].append({"role": "assistant", "content": reply_en})

    # 4. If an agent produced a letter, save it
    letter = None
    if result.get("letter_text"):
        lid = save_letter(result["letter_text"])
        letter = LetterLinks(txt_url=f"/letters/{lid}.txt", pdf_url=f"/letters/{lid}.pdf")

    # 5. Reply -> user's language
    return ChatResponse(
        session_id=req.session_id,
        reply=from_english(reply_en, lang),
        language=lang,
        route=result.get("route"),
        sources=result.get("sources", []),
        flow=result.get("flow"),
        letter=letter,
    )


@app.post("/grievance/letter", response_model=GrievanceResponse)
def grievance_letter(req: GrievanceRequest):
    """Compulsory add-on: the frontend's guided grievance flow ends by calling this."""
    lang = req.language if req.language in SUPPORTED else "en"
    data = {
        "member_name": req.member_name,
        "society_name": req.society_name,
        # free text is translated to English so the PDF (English font) renders correctly
        "issue_type": to_english(req.issue_type, lang),
        "issue_description": to_english(req.issue_description, lang),
        "incident_date": to_english(req.incident_date, lang),
        "desired_resolution": to_english(req.desired_resolution, lang),
    }
    provision = find_provision(f"{data['issue_type']}: {data['issue_description']}")
    text = build_letter_text(data, provision)
    lid = save_letter(text)
    return GrievanceResponse(letter_text=text, provision=provision,
                             txt_url=f"/letters/{lid}.txt", pdf_url=f"/letters/{lid}.pdf")


@app.get("/history/{session_id}")
def history(session_id: str):
    s = sessions.get(session_id)
    return {"language": s["language"], "history": s["history"]}


@app.delete("/session/{session_id}")
def reset(session_id: str):
    sessions.delete(session_id)
    return {"deleted": session_id}


@app.get("/letters/{filename}")
def download_letter(filename: str):
    if "/" in filename or "\\" in filename or not filename.endswith((".txt", ".pdf")):
        raise HTTPException(400, "Invalid filename")
    path = LETTER_DIR / filename
    if not path.exists():
        raise HTTPException(404, "Letter not found")
    return FileResponse(path, filename=f"grievance_letter_{filename}")
