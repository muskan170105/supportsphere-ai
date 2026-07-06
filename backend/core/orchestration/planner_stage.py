from agents.planner import planner_agent

from core.logger import logger

from utils.context_resolver import resolve_context

from core.orchestration.context import PipelineContext


class PlannerStage:
    """
    Executes the Planner Agent for new requests.

    Responsibilities
    ----------------
    - Resolve conversational references.
    - Run the Planner Agent.
    - Persist pending requests when additional
      parameters are required.
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
        """
        Returns
        -------
        True
            Continue pipeline execution.

        False
            Planner requires more parameters.
        """

        context.resolved_query = resolve_context(
            user_query=context.user_query,
            chat_history=context.chat_history,
        )

        logger.info(
            "Running Planner Agent..."
        )

        context.planner_result = planner_agent(
            planner_llm=self.llm,
            user_query=context.resolved_query,
            chat_history=context.chat_history,
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

            logger.info(
                "Planner requires additional parameters."
            )

            self.session.conversation_state.save(
                context.planner_result
            )

            return False

        return True