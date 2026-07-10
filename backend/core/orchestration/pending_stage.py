from core.logger import logger

from core.orchestration.context import PipelineContext


class PendingStage:
    """
    Handles conversations waiting for missing parameters.

    This stage continues an existing task without invoking
    the Planner again.
    """

    def __init__(
        self,
        session,
    ):
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
            Wait for another user message because
            additional parameters are still required.
        """

        state = self.session.conversation_state

        # No pending task
        if not state.is_waiting():
            return True

        memory = state.memory

        # No missing parameters
        if not memory.missing_parameters:
            return True

        parameter = memory.missing_parameters[0]

        logger.info(
            f"Pending parameter received: {parameter}"
        )

        # Store parameter
        memory.update_parameter(
            parameter,
            context.user_query,
        )

        context.conversation.parameters[
            parameter
        ] = context.user_query

        # Still waiting for more information
        if state.has_more_missing_parameters():

            logger.info(
                f"Still waiting for: {memory.missing_parameters}"
            )

            return False

        logger.info(
            "All pending parameters collected."
        )

        # Continue using the existing task.
        # Do NOT clear memory here.
        context.planner_required = False

        return True