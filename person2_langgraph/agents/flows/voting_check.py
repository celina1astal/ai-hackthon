def voting_flow(state):
    query = state.get("user_query", "")
    context = state.get("context", [])

    # Format retrieved mock-RAG documents
    if context:
        source_text = "\n\n".join(
            f"📄 {item['title']}\n{item['text']}"
            for item in context
        )
    else:
        source_text = "No relevant knowledge-base information found."

    response = (
        "Voting Eligibility Flow\n\n"
        f"Your question: {query}\n\n"
        "Relevant knowledge-base context:\n"
        f"{source_text}\n\n"
        "Voting flow:\n"
        "1. Identify the voting question.\n"
        "2. Retrieve the applicable eligibility rules.\n"
        "3. Check the required conditions.\n"
        "4. Provide the relevant source and guidance."
    )

    return {
        "response": response
    }