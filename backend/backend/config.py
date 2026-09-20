
import os
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:                       # python-dotenv missing -> just use real env vars
    load_dotenv = lambda *a, **k: None    # noqa: E731

BACKEND_DIR = Path(__file__).resolve().parent
ROOT = BACKEND_DIR.parent.parent
load_dotenv(BACKEND_DIR / ".env")
load_dotenv(ROOT / ".env")

RAG_DIR = Path(os.getenv("RAG_DIR", ROOT / "rag"))
CHROMA_DIR = RAG_DIR / "chroma_db"        # created by Person 1's `python ingest.py` (run inside rag/)
PERSON2_DIR = ROOT / "person2_langgraph"

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"   # must be the same one Person 1 ingested with
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")  # same model name Person 1 used
# The Gemini key is read from GOOGLE_API_KEY in your .env (same as Person 1's answer.py)
