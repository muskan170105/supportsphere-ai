import time

from core.execution_logger import execution_logger
from core.logger import logger

from services.analytics_service import analytics_service

from core.orchestration.context import PipelineContext


class Finalizer:
    """
    Final stage of the orchestration pipeline.

    Responsibilities
    ----------------
    - Persist conversation history.
    - Update analytics.
    - Save execution timeline.
    - Return the final response.
    """

    def __init__(
        self,
        session,
    ):
        self.session = session

    def execute(
        self,
        context: PipelineContext,
    ) -> str:

        if context.planner_result is None:
            raise ValueError(
                "Planner result is missing."
            )

        if context.answer is None:
            raise ValueError(
                "Response has not been generated."
            )

        # -------------------------------------------------
        # Conversation History
        # -------------------------------------------------

        self.session.history.add_user_message(
            context.user_query
        )

        self.session.history.add_ai_message(
            context.answer
        )

        # -------------------------------------------------
        # Analytics
        # -------------------------------------------------

        analytics_service.record_request(
            intent=str(
                context.planner_result.intent
            ),
            response_time=(
                time.perf_counter()
                - context.start_time
            ),
        )

        # -------------------------------------------------
        # Timeline
        # -------------------------------------------------

        self.session.set_timeline(
            execution_logger.get_steps()
        )

        logger.info("=" * 80)

        return context.answer