from agents.response import response_agent

from core.logger import logger
from core.orchestration.context import PipelineContext


class ResponseStage:
    """
    Generates the final AI response.
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
        """
        Generate the AI response.
        """

        if context.planner_result is None:
            raise ValueError(
                "Planner result is missing."
            )

        logger.info(
            "Running Response Agent..."
        )

        context.answer = response_agent(
            llm=self.llm,
            user_query=context.user_query,
            planner_result=context.planner_result,
            retrieved_context=context.retrieved_context,
            tool_result=context.tool_result,
            chat_history=self.session.history.format_history(),
        )

        logger.info(
            "Response generated."
        )