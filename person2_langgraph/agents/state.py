from typing import TypedDict


class AgentState(TypedDict, total=False):
    user_query: str
    route: str
    context: list[dict]
    response: str
    history: list[dict]
