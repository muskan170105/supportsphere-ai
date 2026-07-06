from agents.planner import planner_agent

from core.logger import logger
from core.execution_logger import execution_logger

from schemas.planner_schema import (
    PlannerOutput,
    Intent,
    Tool,
)

from utils.context_resolver import resolve_context

from core.orchestration.context import PipelineContext


class PlannerStage:
    """
    Executes the Planner Agent.

    Handles:
    - Query resolution
    - Intent detection
    - Fallback when LLM is unavailable
    """

    def __init__(
        self,
        llm,
        session,
    ):
        self.llm = llm
        self.session = session


    def execute(
        self,
        context: PipelineContext,
    ) -> bool:


        context.resolved_query = resolve_context(
            user_query=context.user_query,
            chat_history=context.chat_history,
        )


        logger.info(
            "Running Planner Agent..."
        )


        try:

            context.planner_result = planner_agent(
                planner_llm=self.llm,
                user_query=context.resolved_query,
                chat_history=context.chat_history,
            )


        except Exception as e:

            logger.error(
                f"Planner failed: {str(e)}"
            )


            # Temporary fallback for UI testing

            query = context.resolved_query.lower()


            if "order" in query or "track" in query:

                context.planner_result = PlannerOutput(
                    intent=Intent.ORDER_TRACKING,
                    tool=Tool.ORDER_TRACKING,
                    need_rag=False,
                    parameters={
                        "order_id": "12345"
                    },
                    missing_parameters=[],
                )


            elif "refund" in query:

                context.planner_result = PlannerOutput(
                    intent=Intent.REFUND_REQUEST,
                    tool=Tool.REFUND_REQUEST,
                    need_rag=False,
                    parameters={},
                    missing_parameters=[],
                )


            elif "password" in query:

                context.planner_result = PlannerOutput(
                    intent=Intent.PASSWORD_RESET,
                    tool=Tool.PASSWORD_RESET,
                    need_rag=False,
                    parameters={},
                    missing_parameters=[],
                )


            else:

                context.planner_result = PlannerOutput(
                    intent=Intent.GENERAL_INFORMATION,
                    tool=None,
                    need_rag=False,
                    parameters={},
                    missing_parameters=[],
                )


            execution_logger.log(
                "Planner Agent",
                "Fallback intent classification used"
            )


        logger.info(
            f"Intent : {context.planner_result.intent}"
        )

        logger.info(
            f"Need RAG : {context.planner_result.need_rag}"
        )

        logger.info(
            f"Tool : {context.planner_result.tool}"
        )


        if context.planner_result.missing_parameters:

            self.session.conversation_state.save(
                context.planner_result
            )

            return False


        return True