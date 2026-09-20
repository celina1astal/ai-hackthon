
import re
from pathlib import Path

from .config import CHROMA_DIR, EMBEDDING_MODEL, GEMINI_MODEL

_vectorstore = None
_llm = None

# e.g. "12. Registration of society" at the start of a line -> used as the "section" label
_HEADING = re.compile(r"(?m)^\s*(\d{1,3}[A-Z]?)\.\s+([A-Z][^\n]{3,90})$")

ROUTE_HINTS = {
    "grievance": ("The user wants to raise a complaint. Explain, from the context, which authority or "
                  "procedure applies and what the next steps are. Tell them they can also use the "
                  "'File a Grievance' guided form to generate a ready-to-send letter."),
    "registration": "The user wants to register a cooperative society. List the steps and documents found in the context.",
    "voting": "The user is asking about voting or election eligibility. Explain the conditions found in the context.",
    "legal": "The user is asking about the law or their legal rights. Cite the relevant rule/section if the context has it.",
    "governance": "The user is asking how the society is governed or run. Keep it practical.",
}


def is_available() -> bool:
    """True if Person 1 has run ingest (chroma_db exists and is not empty)."""
    return CHROMA_DIR.exists() and any(CHROMA_DIR.iterdir())


def _get_vectorstore():
    global _vectorstore
    if _vectorstore is None:                       # slow (loads the model) -> done once, on first use
        from langchain_chroma import Chroma
        from langchain_huggingface import HuggingFaceEmbeddings
        _vectorstore = Chroma(
            persist_directory=str(CHROMA_DIR),
            embedding_function=HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL),
        )
    return _vectorstore


def extract_section(text: str) -> str:
    m = _HEADING.search(text)
    return f"{m.group(1)}. {m.group(2).strip()}" if m else ""


def retrieve(query: str, k: int = 3) -> list[dict]:
    """Returns [{"title","text","source","page","section"}] - real chunks with their source."""
    vs = _get_vectorstore()
    results = []                                   # list of (text, metadata)

    rule_match = re.search(r"\brule\s+(\d+[A-Z]?)\b", query, re.IGNORECASE)   # Person 1's shortcut
    if rule_match:
        heading = re.compile(rf"(?mi)^\s*{re.escape(rule_match.group(1))}\.\s+.*registration")
        data = vs.get(include=["documents", "metadatas"])
        for text, meta in zip(data["documents"], data["metadatas"]):
            if heading.search(text):
                if re.search(r"\(\s*1\s*\).*application for registration", text, re.IGNORECASE):
                    results.insert(0, (text, meta or {}))
                else:
                    results.append((text, meta or {}))

    if not results:
        results = [(d.page_content, d.metadata or {}) for d in vs.similarity_search(query, k=k)]

    return [{
        "title": meta.get("title", "Document"),
        "text": text,
        "source": Path(meta.get("source", "")).name,
        "page": meta.get("page"),
        "section": extract_section(text),
    } for text, meta in results[:k]]


def generate_answer(question: str, docs: list[dict], route: str = "governance",
                    history: list[dict] | None = None) -> str:
    """Gemini answer using ONLY the retrieved text. Falls back to the raw text if the LLM fails."""
    global _llm
    if not docs:
        return "I could not find enough information in the available documents."

    context = "\n\n".join(f"[{d['title']}, page {d['page']}]\n{d['text']}" if d.get("page")
                          else f"[{d['title']}]\n{d['text']}" for d in docs)
    convo = "\n".join(f"{m['role']}: {m['content']}" for m in (history or [])[-4:])
    prompt = f"""
You are a helpful assistant for members of cooperative societies in India.

Answer the user's question using ONLY the provided context.
Do not add information that is not supported by the context.
Explain the answer in simple, clear language.
{ROUTE_HINTS.get(route, '')}

If the context does not contain enough information to answer the question, say:
"I could not find enough information in the available documents."

Earlier in this conversation:
{convo or '(none)'}

User question:
{question}

Context:
{context}
"""
    try:
        if _llm is None:
            from langchain_google_genai import ChatGoogleGenerativeAI
            _llm = ChatGoogleGenerativeAI(model=GEMINI_MODEL)
        text = _llm.invoke(prompt).content
        if isinstance(text, list):
            text = "\n".join(t.get("text", "") for t in text if isinstance(t, dict) and t.get("type") == "text")
        return text.strip()
    except Exception as e:                         # noqa: BLE001
        print(f"[rag_client] Gemini failed ({e!r}) -> returning raw retrieved text")
        return "Here is the most relevant text I found:\n\n" + docs[0]["text"][:800]
