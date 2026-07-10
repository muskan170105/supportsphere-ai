from agents.response import response_agent

from core.logger import logger
from core.execution_logger import execution_logger

from core.orchestration.context import PipelineContext


class ResponseStage:
    """
    Generates the final response.

    Works identically in both
    Production and Developer Mode.
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
    ):

        logger.info(
            "Running Response Agent..."
        )

        planner_result = context.planner_result

        # ==========================================
        # Planner skipped
        # ==========================================

        if planner_result is None and context.working_memory:

            memory = context.working_memory

            class PlannerLike:

                intent = memory.current_intent

                tool = memory.current_tool

                parameters = memory.parameters

                missing_parameters = []

                need_rag = False

            planner_result = PlannerLike()

        try:

            context.answer = response_agent(

                response_llm=self.llm,

                user_query=context.user_query,

                planner_result=planner_result,

                tool_result=context.tool_result,

                retrieved_context=context.retrieved_context,

                chat_history=self.session.history.format_history(),

            )

            # ==========================================
            # Memory
            # ==========================================

            if context.working_memory:

                context.working_memory.last_answer = (
                    context.answer
                )

            # ==========================================
            # History
            # ==========================================

            self.session.history.add_user_message(
                context.user_query
            )

            self.session.history.add_ai_message(
                context.answer
            )

            execution_logger.log(

                "Response Agent",

                "Generated final AI response",

            )

            logger.info(
                "Response generated."
            )

        except Exception as e:

            logger.exception(e)

            context.answer = (
                "Sorry, I couldn't generate a response."
            )