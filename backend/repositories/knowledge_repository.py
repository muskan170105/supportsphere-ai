from pathlib import Path


class KnowledgeRepository:
    """
    Handles persistence of uploaded
    knowledge base documents.
    """

    def __init__(self):

        self.documents_path = (
            Path(__file__)
            .resolve()
            .parent.parent
            / "knowledge_base"
            / "documents"
        )

        self.documents_path.mkdir(
            parents=True,
            exist_ok=True,
        )

    # ==========================================================
    # Save
    # ==========================================================

    def save_document(
        self,
        filename: str,
        content: bytes,
    ) -> str:

        file_path = (
            self.documents_path
            / filename
        )

        with open(
            file_path,
            "wb",
        ) as file:

            file.write(content)

        return str(file_path)

    # ==========================================================
    # List
    # ==========================================================

    def list_documents(self):

        documents = []

        files = sorted(
            self.documents_path.iterdir(),
            key=lambda f: f.stat().st_mtime,
            reverse=True,
        )

        for index, file in enumerate(
            files,
            start=1,
        ):

            if not file.is_file():
                continue

            documents.append({

                "id": index,

                "name": file.name,

                "type": file.suffix.replace(".", "").upper(),

                "chunks": "-",

                "status": "Indexed",

                "uploaded": "Recently",

                "size": round(
                    file.stat().st_size / 1024,
                    2,
                ),

            })

        return documents

    # ==========================================================
    # Get One
    # ==========================================================

    def get_document(
        self,
        document_id: int,
    ):

        files = sorted(
            self.documents_path.iterdir(),
            key=lambda f: f.stat().st_mtime,
            reverse=True,
        )

        files = [
            file
            for file in files
            if file.is_file()
        ]

        if (
            document_id < 1
            or document_id > len(files)
        ):

            return None

        file = files[
            document_id - 1
        ]

        return file
    
    # ==========================================================
    # Delete
    # ==========================================================

    def delete_document(
        self,
        filename: str,
    ):

        file_path = (
            self.documents_path
            / filename
        )

        if file_path.exists():

            file_path.unlink()


knowledge_repository = (
    KnowledgeRepository()
)