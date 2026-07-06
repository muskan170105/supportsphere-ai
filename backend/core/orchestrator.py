import time

from core.execution_logger import execution_logger
from core.logger import logger

from core.orchestration.context import PipelineContext

from core.orchestration.pending_stage import PendingStage
from core.orchestration.planner_stage import PlannerStage
from core.orchestration.tool_stage import ToolStage
from core.orchestration.retriever_stage import RetrieverStage
from core.orchestration.response_stage import ResponseStage
from core.orchestration.finalizer import Finalizer


class ConversationOrchestrator:
    """
    Coordinates the complete SupportSphere AI pipeline.

    The orchestrator itself contains no business logic.
    Each responsibility is delegated to an individual stage.
    """

    def __init__(
        self,
        llm,
        embedding_model,
        tool_agent,
        session,
    ):
        self.session = session

        self.pending_stage = PendingStage(session)

        self.planner_stage = PlannerStage(
            llm=llm,
            session=session,
        )

        self.tool_stage = ToolStage(
            tool_agent=tool_agent,
        )

        self.retriever_stage = RetrieverStage(
            embedding_model=embedding_model,
        )

        self.response_stage = ResponseStage(
            llm=llm,
            session=session,
        )

        self.finalizer = Finalizer(
            session=session,
        )

    def run(
        self,
        user_query: str,
    ) -> str:

        logger.info("=" * 80)
        logger.info(
            f"User Query : {user_query}"
        )

        execution_logger.clear()

        context = PipelineContext(
            user_query=user_query,
            start_time=time.perf_counter(),
            chat_history=self.session.history.get_history(),
        )

        try:

            # ---------------------------------------
            # Pending Conversation
            # ---------------------------------------

            if not self.pending_stage.execute(
                context
            ):

                self.response_stage.execute(
                    context
                )

                return self.finalizer.execute(
                    context
                )

            # ---------------------------------------
            # Planner
            # ---------------------------------------

            if context.planner_result is None:

                if not self.planner_stage.execute(
                    context
                ):

                    self.response_stage.execute(
                        context
                    )

                    return self.finalizer.execute(
                        context
                    )

            # ---------------------------------------
            # Tool
            # ---------------------------------------

            self.tool_stage.execute(
                context
            )

            # ---------------------------------------
            # Retriever
            # ---------------------------------------

            self.retriever_stage.execute(
                context
            )

            # ---------------------------------------
            # Response
            # ---------------------------------------

            self.response_stage.execute(
                context
            )

            # ---------------------------------------
            # Finalize
            # ---------------------------------------

            return self.finalizer.execute(
                context
            )

        except Exception:

            logger.exception(
                "Pipeline execution failed."
            )

            raise