import uuid

from langchain_chroma import Chroma

from core.dependencies import (
    embedding_model,
)


class EmbeddingService:
    """
    Handles vector indexing
    and deletion inside ChromaDB.
    """

    def __init__(self):

        self.vector_db = Chroma(

            persist_directory="chroma_db",

            embedding_function=embedding_model,

        )

    # =====================================================
    # Index
    # =====================================================

    def index_documents(
        self,
        chunks,
        filename: str,
    ) -> int:

        ids = []

        for chunk in chunks:

            ids.append(
                str(uuid.uuid4())
            )

            chunk.metadata["filename"] = filename

            chunk.metadata.setdefault(
                "source",
                filename,
            )

        self.vector_db.add_documents(

            documents=chunks,

            ids=ids,

        )

        print("=" * 60)
        print(
            f"Indexed {len(chunks)} chunks."
        )
        print("=" * 60)

        return len(chunks)

    # =====================================================
    # Delete
    # =====================================================

    def delete_document_vectors(
        self,
        filename: str,
    ):

        self.vector_db.delete(

            where={

                "filename": filename

            }

        )

        print("=" * 60)
        print(
            f"Deleted vectors for {filename}"
        )
        print("=" * 60)


embedding_service = (
    EmbeddingService()
)