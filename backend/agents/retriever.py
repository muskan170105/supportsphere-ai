from langchain_chroma import Chroma


def retriever_agent(
    embedding_model,
    user_query: str,
    k: int = 3,
) -> str:
    """
    Retriever Agent

    Responsibilities
    ----------------
    - Query the vector database.
    - Retrieve semantically similar documents.
    - Return the retrieved context as text.

    Args:
        embedding_model:
            Embedding model used by ChromaDB.

        user_query:
            Customer's question.

        k:
            Number of documents to retrieve.

    Returns:
        Combined textual context from retrieved documents.
    """

    vector_db = Chroma(
        persist_directory="chroma_db",
        embedding_function=embedding_model,
    )

    documents = vector_db.similarity_search(
        user_query,
        k=k,
    )

    context = "\n\n".join(
        doc.page_content for doc in documents
    )

    return context