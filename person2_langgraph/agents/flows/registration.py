def registration_flow(state):
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
        "Registration Flow\n\n"
        f"Your question: {query}\n\n"
        "Relevant knowledge-base context:\n"
        f"{source_text}\n\n"
        "Registration flow:\n"
        "1. Identify the registration type.\n"
        "2. Check the applicable requirements.\n"
        "3. Prepare the required documents.\n"
        "4. Submit the application to the competent authority.\n"
        "5. Verify the application status."
    )

    return {
        "response": response
    }