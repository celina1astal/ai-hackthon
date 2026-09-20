import re

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
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

print("\nRelevant information:\n")

for i, result in enumerate(results[:3], 1):
    print(f"--- Result {i} ---")
    print(result.page_content)
    print("\nSource:", result.metadata)
    print()