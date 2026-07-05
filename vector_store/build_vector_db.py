from dotenv import load_dotenv
import os

from langchain_chroma import Chroma
from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
)
from langchain_google_genai import GoogleGenerativeAIEmbeddings


def build_vector_database():
    """
    Build the SupportSphere vector database.

    Responsibilities
    ----------------
    - Load company knowledge.
    - Generate embeddings.
    - Store embeddings inside ChromaDB.
    """

    load_dotenv()

    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        raise ValueError(
            "GOOGLE_API_KEY not found."
        )

    embedding_model = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=api_key,
    )

    loader = DirectoryLoader(
        "knowledge_base",
        glob="*.txt",
        loader_cls=TextLoader,
    )

    documents = loader.load()

    if not documents:
        raise ValueError(
            "Knowledge base is empty."
        )

    Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        persist_directory="chroma_db",
    )

    print("Vector database created successfully.")


if __name__ == "__main__":
    build_vector_database()