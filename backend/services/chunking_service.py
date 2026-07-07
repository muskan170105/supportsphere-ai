from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
)


class ChunkingService:
    """
    Splits LangChain Documents into
    smaller chunks suitable for RAG.
    """

    def __init__(self):

        self.splitter = (
            RecursiveCharacterTextSplitter(

                chunk_size=800,

                chunk_overlap=150,

                separators=[
                    "\n\n",
                    "\n",
                    ". ",
                    " ",
                    "",
                ],
            )
        )

    def split_documents(
        self,
        documents,
    ):

        return self.splitter.split_documents(
            documents
        )


chunking_service = ChunkingService()