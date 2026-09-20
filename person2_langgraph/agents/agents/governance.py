def governance_agent(state):
    query = state.get("user_query", "")
    context = state.get("context", [])

    # Format retrieved RAG documents
    if context:
        source_text = "\n\n".join(
            f"📄 {item['title']}\n{item['text']}"
            for item in context
        )
    else:
        source_text = "No relevant knowledge-base information found."

    response = (
        "Governance Agent\n\n"
        f"Your question: {query}\n\n"
        "Relevant knowledge-base context:\n"
        f"{source_text}\n\n"
        "Next steps:\n"
        "1. Identify the governance issue.\n"
        "2. Check the applicable cooperative rules.\n"
        "3. Review the relevant authority or procedure.\n"
        "4. Refer to the authoritative source for the final answer."
    )

    return {
        "response": response
    }
