def grievance_flow(state):
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
        "Grievance Flow\n\n"
        f"Your question: {query}\n\n"
        "Relevant knowledge-base context:\n"
        f"{source_text}\n\n"
        "Grievance flow:\n"
        "1. Understand the complaint.\n"
        "2. Identify the responsible authority or process.\n"
        "3. Check the applicable rules.\n"
        "4. Identify supporting documents or evidence.\n"
        "5. Explain the available next steps."
    )

    return {
        "response": response
    }