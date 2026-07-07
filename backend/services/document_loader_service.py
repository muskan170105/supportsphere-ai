from pathlib import Path

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader,
)


class DocumentLoaderService:

    def load_document(
        self,
        file_path: str,
    ):

        path = Path(file_path)

        extension = (
            path.suffix.lower()
        )

        if extension == ".pdf":

            loader = PyPDFLoader(
                file_path
            )

        elif extension == ".txt":

            loader = TextLoader(
                file_path,
                encoding="utf-8",
            )

        elif extension == ".docx":

            loader = Docx2txtLoader(
                file_path
            )

        else:

            raise ValueError(
                f"Unsupported document type: {extension}"
            )

        return loader.load()


document_loader_service = (
    DocumentLoaderService()
)