# Person 2 - LangGraph Agents

This module is designed to run independently before the other team members finish.

## Current setup

- LangGraph router
- Governance and legal agents
- Voting, grievance, and registration flows
- Mock retriever
- In-memory conversation state/checkpointing
- Clean interfaces for replacing the mock retriever with Person 1's real RAG later

## Project structure

```text
person2_langgraph/
├── main.py
├── requirements.txt
├── .gitignore
├── README.md
└── agents/
    ├── __init__.py
    ├── state.py
    ├── router.py
    ├── graph.py
    ├── memory.py
    ├── agents/
    │   ├── __init__.py
    │   ├── governance.py
    │   └── legal.py
    ├── flows/
    │   ├── __init__.py
    │   ├── voting_check.py
    │   ├── grievance.py
    │   └── registration.py
    ├── tools/
    │   ├── __init__.py
    │   └── retrieve.py
    └── utils/
        ├── __init__.py
        └── validation.py
```

## Run locally

Use Python 3.10+.

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
python main.py
```

Try:

```text
How do I check my voting eligibility?
I want to register a cooperative.
How can I file a grievance?
What does the cooperative law say about registration?
```

## Later integration

Person 1 can replace:

```text
agents/tools/retrieve.py
```

with the real RAG retriever while keeping the same function:

```python
retrieve(query: str) -> list[dict]
```

Person 3 can call the graph from FastAPI instead of `main.py`.

Person 4 can consume the FastAPI endpoint from the frontend.

## Git

Create a branch:

```bash
git checkout -b person2-langgraph
```

Commit:

```bash
git add .
git commit -m "Add LangGraph agents and guided flows"
```

Push:

```bash
git push -u origin person2-langgraph
```
