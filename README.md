# Cooperative & Legal Helpdesk — Integrated Product

This repository combines:
- `frontend/`: React + Vite UI
- `backend/backend/`: FastAPI API, language support, sessions, letters
- `rag/`: Person 1's documents and ingestion pipeline
- `person2_langgraph/`: LangGraph routing and agent flows

## Setup

### 1. Python environment

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements.txt
```

Create `backend/backend/.env`:

```env
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-3.6-flash
```

### 2. Build the RAG index

```bash
cd rag
python ingest.py
```

### 3. Start the API

From the project root:

```bash
cd backend
uvicorn backend.main:app --reload --port 8000
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Notes

- The frontend calls the FastAPI `/chat` endpoint instead of mock responses.
- RAG and LangGraph retrieval are lazy-loaded so the API can start before the index exists.
- Legal answers are informational and should be verified against authoritative sources.
