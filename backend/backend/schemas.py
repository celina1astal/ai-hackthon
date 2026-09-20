from typing import Optional
from pydantic import BaseModel


class ChatRequest(BaseModel):
    session_id: str
    message: str
    language: Optional[str] = None   # language code from the dropdown, e.g. "hi". Omit = auto-detect


class LetterLinks(BaseModel):
    txt_url: str
    pdf_url: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str                        # already translated to the user's language
    language: str
    route: Optional[str] = None       # governance | legal | voting | grievance | registration
    sources: list[dict] = []          # [{"doc": "...", "section": "...", "page": 12}]
    flow: Optional[dict] = None       # e.g. {"name": "grievance", "step": 2, "total": 6}
    letter: Optional[LetterLinks] = None


class GrievanceRequest(BaseModel):
    member_name: str
    society_name: str
    issue_type: str
    issue_description: str
    incident_date: str = "Not specified"
    desired_resolution: str = "Appropriate action as per the bylaws and the Act"
    language: Optional[str] = None    # language the free-text fields were typed in


class GrievanceResponse(BaseModel):
    letter_text: str
    provision: str
    txt_url: str
    pdf_url: str
