from pathlib import Path
import re

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

DOCUMENTS_PATH = Path("documents")

all_documents = []

for file in DOCUMENTS_PATH.iterdir():

    if file.suffix.lower() == ".pdf":

        loader = PyPDFLoader(str(file))
        pages = loader.load()

        for page in pages:
            all_documents.append(
                Document(
                    page_content=page.page_content,
                    metadata={
                        "source": str(file),
                        "title": file.stem,
                        "page": page.metadata.get("page", 0) + 1,
                        "total_pages": len(pages)
                    }
                )
            )

    elif file.suffix.lower() == ".md":

        loader = TextLoader(str(file), encoding="utf-8")
        docs = loader.load()

        for doc in docs:
            doc.metadata["source"] = str(file)
            doc.metadata["title"] = file.stem
            all_documents.append(doc)

print(f"Total pages/documents loaded: {len(all_documents)}")

chunks = []

for doc in all_documents:

    text = doc.page_content.strip()

    if len(text) < 100:
        continue

    chunks.append(
        Document(
            page_content=text,
            metadata=doc.metadata
        )
    )

print(f"Total chunks created: {len(chunks)}")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

print("Embedding model loaded!")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="chroma_db"
)

print("ChromaDB created successfully!")