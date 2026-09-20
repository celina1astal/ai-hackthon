import sys

from . import rag_client
from .config import ROOT, PERSON2_DIR

for p in (ROOT, PERSON2_DIR):                     # so `agents` (Person 2) can be imported
    if str(p) not in sys.path:
        sys.path.insert(0, str(p))

_graph = None
try:
    from agents.graph import build_graph          # Person 2
    _graph = build_graph()
except Exception as e:                            # noqa: BLE001
    print(f"\n[agent_adapter] Person 2's graph not loaded ({e!r}). Routing defaults to 'governance'.\n")


def status() -> dict:
    return {"agents": _graph is not None, "rag": rag_client.is_available()}


def _fetch_docs(query: str) -> list[dict]:
    if not rag_client.is_available():
        return []
    try:
        return rag_client.retrieve(query)
    except Exception as e:                        # noqa: BLE001
        print(f"[agent_adapter] retrieval failed: {e!r}")
        return []


def run_agent(message_en: str, session: dict) -> dict:
    """message_en: user message in English. Returns reply/route/sources/flow/letter_text."""
    result = {}
    if _graph is not None:
        result = _graph.invoke(
            {"user_query": message_en},
            config={"configurable": {"thread_id": session["id"]}},
        )
    route = result.get("route") or "governance"
    docs = _fetch_docs(message_en)
    sources = [{"doc": d["title"], "section": d["section"], "page": d["page"]} for d in docs]

    if result.get("flow") or result.get("letter_text"):
        # Person 2 has a real guided flow now -> use their reply untouched
        reply = result.get("response", "")
    elif docs:
        reply = rag_client.generate_answer(message_en, docs, route, session["history"][:-1])
    else:
        reply = result.get("response") or (
            "I could not find this in the available documents. "
            "Please contact your Registrar of Cooperative Societies.")
        sources = []                              # Person 2's mock docs are not real sources

    return {
        "reply": reply,
        "route": route,
        "sources": sources,
        "flow": result.get("flow"),
        "letter_text": result.get("letter_text"),
    }


def find_provision(issue_text: str) -> str:
    """Most relevant Act / rule for the grievance letter, taken from Person 1's documents."""
    docs = _fetch_docs(issue_text)
    if docs:
        d = docs[0]
        page = f", page {d['page']}" if d.get("page") else ""
        section = f" ({d['section']})" if d.get("section") else ""
        return f"{d['title']}{page}{section}"
    return "the applicable provisions of the Cooperative Societies Act and the society's bylaws"
