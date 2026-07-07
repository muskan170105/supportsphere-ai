from fastapi import UploadFile

from repositories.knowledge_repository import (
    knowledge_repository,
)

from repositories.metadata_repository import (
    metadata_repository,
)

from services.document_loader_service import (
    document_loader_service,
)

from services.chunking_service import (
    chunking_service,
)

from services.embedding_service import (
    embedding_service,
)


class DocumentUploadService:

    ALLOWED_EXTENSIONS = {
        ".pdf",
        ".txt",
        ".docx",
    }

    async def upload_document(
        self,
        file: UploadFile,
    ):

        extension = (
            "." +
            file.filename.split(".")[-1].lower()
        )

        if extension not in self.ALLOWED_EXTENSIONS:

            raise ValueError(
                f"Unsupported file type: {extension}"
            )

        # ---------------------------------------------
        # Save File
        # ---------------------------------------------

        content = await file.read()

        saved_path = (
            knowledge_repository.save_document(
                filename=file.filename,
                content=content,
            )
        )

        # ---------------------------------------------
        # Load Document
        # ---------------------------------------------

        documents = (
            document_loader_service.load_document(
                saved_path
            )
        )

        # ---------------------------------------------
        # Chunk Document
        # ---------------------------------------------

        chunks = (
            chunking_service.split_documents(
                documents
            )
        )

        # ---------------------------------------------
        # Generate Embeddings
        # ---------------------------------------------

        indexed = (
            embedding_service.index_documents(
                chunks=chunks,
                filename=file.filename,
            )
        )

        # ---------------------------------------------
        # Save Metadata
        # ---------------------------------------------

        metadata_repository.save_document(

            filename=file.filename,

            chunks=len(chunks),

            status="Indexed",

        )

        print("=" * 60)

        print(
            f"Document : {file.filename}"
        )

        print(
            f"Pages : {len(documents)}"
        )

        print(
            f"Chunks : {len(chunks)}"
        )

        print(
            f"Indexed : {indexed}"
        )

        print("=" * 60)

        return {

            "filename": file.filename,

            "status": "Indexed",

            "pages": len(documents),

            "chunks": len(chunks),

            "indexed": indexed,

        }


document_upload_service = (
    DocumentUploadService()
)