import json
import uuid

from datetime import datetime
from pathlib import Path


class MetadataRepository:

    def __init__(self):

        self.metadata_path = (
            Path(__file__)
            .resolve()
            .parent.parent
            / "knowledge_base"
            / "metadata.json"
        )

        if not self.metadata_path.exists():

            with open(
                self.metadata_path,
                "w",
            ) as file:

                json.dump(
                    [],
                    file,
                    indent=4,
                )

    # ======================================================
    # Read
    # ======================================================

    def get_all(self):

        with open(
            self.metadata_path,
            "r",
        ) as file:

            return json.load(file)

    # ======================================================
    # Write
    # ======================================================

    def save_all(
        self,
        documents,
    ):

        with open(
            self.metadata_path,
            "w",
        ) as file:

            json.dump(
                documents,
                file,
                indent=4,
            )

    # ======================================================
    # Save
    # ======================================================

    def save_document(

        self,

        filename,

        chunks,

        status="Indexed",

    ):

        documents = self.get_all()

        documents = [

            doc

            for doc in documents

            if doc["filename"] != filename

        ]

        documents.append(

            {

                "id": str(
                    uuid.uuid4()
                ),

                "filename": filename,

                "type": filename.split(".")[-1].upper(),

                "chunks": chunks,

                "status": status,

                "uploaded_at": datetime.now().strftime(
                    "%d %b %Y %H:%M"
                ),

            }

        )

        self.save_all(
            documents
        )

    # ======================================================
    # Find
    # ======================================================

    def get_document(
        self,
        document_id,
    ):

        for document in self.get_all():

            if document["id"] == document_id:

                return document

        return None

    # ======================================================
    # Delete
    # ======================================================

    def delete_document(
        self,
        document_id,
    ):

        documents = self.get_all()

        documents = [

            document

            for document in documents

            if document["id"] != document_id

        ]

        self.save_all(
            documents
        )


metadata_repository = (
    MetadataRepository()
)