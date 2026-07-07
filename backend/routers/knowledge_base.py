from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from services.embedding_service import (
    embedding_service,
)

from repositories.knowledge_repository import (
    knowledge_repository,
)

from repositories.metadata_repository import (
    metadata_repository,
)

from services.document_loader_service import (
    document_loader_service,
)

from services.document_upload_service import (
    document_upload_service,
)


router = APIRouter(
    prefix="/knowledge-base",
    tags=["Knowledge Base"],
)


# ==========================================================
# Upload
# ==========================================================

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    try:

        return await (
            document_upload_service.upload_document(
                file
            )
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# ==========================================================
# List Documents
# ==========================================================

@router.get("/documents")
def get_documents():

    documents = metadata_repository.get_all()

    response = []

    for document in documents:

        response.append(

            {

                "id": document["id"],

                "name": document["filename"],

                "type": document["type"],

                "chunks": document["chunks"],

                "status": document["status"],

                "uploaded": document["uploaded_at"],

            }

        )

    return response


# ==========================================================
# Preview Document
# ==========================================================

@router.get(
    "/document/{document_id}"
)
def preview_document(
    document_id: str,
):

    metadata = (
        metadata_repository.get_document(
            document_id
        )
    )

    if metadata is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    file_path = (
        knowledge_repository.documents_path
        / metadata["filename"]
    )

    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Document file not found.",
        )

    documents = (
        document_loader_service.load_document(
            str(file_path)
        )
    )

    preview = "\n\n".join(

        document.page_content

        for document in documents

    )

    return {

        "id": metadata["id"],

        "filename": metadata["filename"],

        "type": metadata["type"],

        "chunks": metadata["chunks"],

        "status": metadata["status"],

        "uploaded": metadata["uploaded_at"],

        "preview": preview[:2500],

    }
# ==========================================================
# Delete Document
# ==========================================================

@router.delete(
    "/document/{document_id}"
)
def delete_document(
    document_id: str,
):

    metadata = (
        metadata_repository.get_document(
            document_id
        )
    )

    if metadata is None:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    # Delete vectors from ChromaDB
    embedding_service.delete_document_vectors(
        metadata["filename"]
    )

    # Delete physical file
    knowledge_repository.delete_document(
        metadata["filename"]
    )

    # Delete metadata
    metadata_repository.delete_document(
        document_id
    )

    return {

        "message":
        "Document deleted successfully."

    }