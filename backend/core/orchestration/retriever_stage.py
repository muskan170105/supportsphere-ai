from agents.retriever import retriever_agent

from core.logger import logger
from core.orchestration.context import PipelineContext


class RetrieverStage:
    """
    Retrieves relevant knowledge from the vector database
    when the Planner Agent determines that RAG is required.
    """

    def __init__(
        self,
        embedding_model,
    ):
        self.embedding_model = embedding_model

    def execute(
        self,
        context: PipelineContext,
    ):
        """
        Retrieve context from ChromaDB.

        If RAG is not required, this stage exits immediately.
        """

        if context.planner_result is None:
            raise ValueError(
                "Planner result is missing."
            )

        if not context.planner_result.need_rag:
            return

        logger.info(
            "Running Retriever Agent..."
        )

        context.retrieved_context = retriever_agent(
            embedding_model=self.embedding_model,
            user_query=context.user_query,
        )

        logger.info(
            "Retriever completed."
        )