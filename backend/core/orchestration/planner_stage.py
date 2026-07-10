from agents.planner import planner_agent

from core.execution_logger import execution_logger
from core.logger import logger

from core.orchestration.context import PipelineContext


class PlannerStage:

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

        if not context.planner_required:

            logger.info(
                "Planner skipped by Conversation Engine."
            )

            execution_logger.log(

                "Conversation Engine",

                "Planner skipped",

            )

            return

        logger.info(
            "Running Planner Agent..."
        )

        planner_result = planner_agent(

            planner_llm=self.llm,

            user_query=context.user_query,

            working_memory=context.working_memory,

            chat_history=context.chat_history,

        )

        conversation = context.conversation

        if conversation is not None:

            planner_result.parameters = {

                **conversation.parameters,

                **planner_result.parameters,

            }

        context.planner_result = planner_result

        self.session.conversation_state.update_from_planner(

            planner_result

        )

        execution_logger.log(

            "Planner Agent",

            f"Intent: {planner_result.intent.value}",

        )

        logger.info(
            f"Intent : {planner_result.intent.value}"
        )

        logger.info(
            f"Need RAG : {planner_result.need_rag}"
        )

        logger.info(
            f"Tool : {planner_result.tool}"
        )