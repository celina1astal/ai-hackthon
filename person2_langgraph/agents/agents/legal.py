def legal_agent(state):
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
        "Legal Agent\n\n"
        f"Your question: {query}\n\n"
        "Relevant knowledge-base context:\n"
        f"{source_text}\n\n"
        "Legal guidance flow:\n"
        "1. Identify the relevant legal provision.\n"
        "2. Review the retrieved source material.\n"
        "3. Provide the relevant section or rule.\n"
        "4. Refer to the authoritative document for the final interpretation."
    )

    return {
        "response": response
    }
