from agents.retriever import retriever_agent

from core.logger import logger
from core.orchestration.context import PipelineContext

from core.conversation.topic_detector import (
    TopicDetector,
)


class RetrieverStage:
    """
    Retrieves knowledge from the vector database.

    Supports retrieval cache reuse.
    """

    def __init__(
        self,
        embedding_model,
    ):
        self.embedding_model = embedding_model

        self.topic_detector = TopicDetector()

    def execute(
        self,
        context: PipelineContext,
    ):

        if context.planner_result is None:

            logger.info(
                "Planner skipped. Retriever skipped."
            )

            return
        
        if not context.planner_result.need_rag:

            logger.info(
                "Retriever skipped (RAG not required)."
            )

            return

        memory = context.working_memory

        # ==================================================
        # Reuse Cached Retrieval
        # ==================================================

        if (

            memory is not None

            and memory.retrieval_cache.has_cache()

            and self.topic_detector.is_same_topic(

                context.planner_result.intent.value,

                memory.retrieval_cache.intent,

            )

        ):

            logger.info(
                "Using cached retrieval."
            )

            context.retrieved_context = (

                memory.retrieval_cache.context

            )

            context.retrieved_sources = (

                memory.retrieval_cache.sources

            )

            if context.conversation:

                context.conversation.reuse_cached_retrieval = True

            return

        # ==================================================
        # Retrieve
        # ==================================================

        logger.info(
            "Running Retriever Agent..."
        )

        retrieval_result = retriever_agent(

            embedding_model=self.embedding_model,

            user_query=context.user_query,

        )

        context.retrieved_context = (

            retrieval_result.get(
                "context",
                "",
            )

        )

        context.retrieved_sources = (

            retrieval_result.get(
                "sources",
                [],
            )

        )

        context.retrieval_scores = (

            retrieval_result.get(
                "scores",
                [],
            )

        )

        if context.retrieval_scores:

            context.average_similarity = round(

                sum(context.retrieval_scores)

                /

                len(context.retrieval_scores),

                3,

            )

        else:

            context.average_similarity = None

        # ==================================================
        # Save Cache
        # ==================================================

        if memory is not None:

            memory.retrieval_cache.remember(

                query=context.user_query,

                intent=context.planner_result.intent.value,

                context=context.retrieved_context,

                sources=context.retrieved_sources,

            )

        logger.info(

            f"Retrieved {len(context.retrieved_sources)} source document(s)."

        )

        logger.info(
            "Retriever completed."
        )