import os
import re

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.documents import Document

load_dotenv()

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
)

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash"
)


question = input("Ask a question: ")

data = vectorstore.get(
    include=["documents", "metadatas"]
)

documents = data["documents"]
metadatas = data["metadatas"]

results = []

rule_match = re.search(
    r"\brule\s+(\d+[A-Z]?)\b",
    question,
    re.IGNORECASE
)

if rule_match:
    rule_number = rule_match.group(1)

    heading_pattern = re.compile(
        rf"(?mi)^\s*{re.escape(rule_number)}\.\s+"
        rf".*registration"
    )

    candidates = []

    for text, metadata in zip(documents, metadatas):
        if heading_pattern.search(text):
            candidates.append(
                Document(
                    page_content=text,
                    metadata=metadata or {}
                )
            )

    for result in candidates:
        if re.search(
            r"\(\s*1\s*\).*application for registration",
            result.page_content,
            re.IGNORECASE
        ):
            results.insert(0, result)
        else:
            results.append(result)

if not results:
    results = vectorstore.similarity_search(
        question,
        k=3
    )

results = results[:3]

context = "\n\n".join(
    result.page_content
    for result in results
)

sources = []

for result in results:
    source = result.metadata.get("source", "Unknown")
    page = result.metadata.get("page")

    if page:
        sources.append(f"{source}, Page {page}")
    else:
        sources.append(source)

source_text = "\n".join(
    f"- {source}"
    for source in dict.fromkeys(sources)
)

prompt = f"""
You are a helpful assistant for members of Multi-State Cooperative Societies in India.

Answer the user's question using ONLY the provided context.

Do not add information that is not supported by the context.

Explain the answer in simple, clear language.

If the context does not contain enough information to answer the question, say:
"I could not find enough information in the available documents."

User question:
{question}

Context:
{context}

Sources:
{source_text}
"""

response = llm.invoke(prompt)

answer_text = response.content

if isinstance(answer_text, list):
    answer_text = "\n".join(
        item.get("text", "")
        for item in answer_text
        if isinstance(item, dict) and item.get("type") == "text"
    )

print("\nAnswer:\n")
print(answer_text)

print("\nSources:")
print(source_text)