"""RAG retrieval adapter used by LangGraph. Loads the vector store lazily."""
import re
from pathlib import Path

_VECTORSTORE = None

def _get_vectorstore():
    global _VECTORSTORE
    if _VECTORSTORE is None:
        from langchain_chroma import Chroma
        from langchain_huggingface import HuggingFaceEmbeddings
        project_root = Path(__file__).resolve().parents[3]
        chroma_path = project_root / "rag" / "chroma_db"
        if not chroma_path.exists():
            return None
        _VECTORSTORE = Chroma(
            persist_directory=str(chroma_path),
            embedding_function=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),
        )
    return _VECTORSTORE

def retrieve(question: str) -> list[dict]:
    vectorstore = _get_vectorstore()
    if vectorstore is None:
        return []
    results = []
    rule_match = re.search(r"\brule\s+(\d+[A-Z]?)\b", question, re.IGNORECASE)
    if rule_match:
        rule_number = rule_match.group(1)
        data = vectorstore.get(include=["documents", "metadatas"])
        for text, metadata in zip(data.get("documents", []), data.get("metadatas", [])):
            if re.search(rf"(?mi)^\s*{re.escape(rule_number)}\.\s+.*registration", text):
                results.append((text, metadata or {}))
        results.sort(key=lambda item: 0 if re.search(r"\(\s*1\s*\).*application for registration", item[0], re.I) else 1)
    if not results:
        results = [(d.page_content, d.metadata or {}) for d in vectorstore.similarity_search(question, k=3)]
    return [{
        "title": meta.get("title", Path(meta.get("source", "Document")).name),
        "text": text,
        "metadata": meta,
    } for text, meta in results[:3]]
