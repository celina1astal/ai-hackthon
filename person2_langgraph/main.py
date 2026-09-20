from agents.graph import build_graph

def main():
    graph = build_graph()

    print("Person 2 LangGraph module")
    print("Type 'exit' to stop.\n")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "exit":
            break
        if not user_input:
            continue

        result = graph.invoke(
            {"user_query": user_input},
            config={"configurable": {"thread_id": "local-demo"}},
        )

        print(f"\nAssistant: {result.get('response', 'No response generated.')}")
        print(f"Route: {result.get('route', 'unknown')}\n")


if __name__ == "__main__":
    main()
