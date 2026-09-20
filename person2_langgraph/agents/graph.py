from langgraph.graph import StateGraph, START, END

from agents.state import AgentState
from agents.router import route_query
from agents.memory import memory
from agents.tools.retrieve import retrieve

from agents.agents.governance import governance_agent
from agents.agents.legal import legal_agent
from agents.flows.voting_check import voting_flow
from agents.flows.grievance import grievance_flow
from agents.flows.registration import registration_flow


def router_node(state: AgentState):
    query = state.get("user_query", "")
    route = route_query(query)
    context = retrieve(query)
    return {"route": route, "context": context}


def build_graph():
    builder = StateGraph(AgentState)

    builder.add_node("router", router_node)
    builder.add_node("governance", governance_agent)
    builder.add_node("legal", legal_agent)
    builder.add_node("voting", voting_flow)
    builder.add_node("grievance", grievance_flow)
    builder.add_node("registration", registration_flow)

    builder.add_edge(START, "router")

    builder.add_conditional_edges(
        "router",
        lambda state: state["route"],
        {
            "governance": "governance",
            "legal": "legal",
            "voting": "voting",
            "grievance": "grievance",
            "registration": "registration",
        },
    )

    for node in ["governance", "legal", "voting", "grievance", "registration"]:
        builder.add_edge(node, END)

    return builder.compile(checkpointer=memory)
