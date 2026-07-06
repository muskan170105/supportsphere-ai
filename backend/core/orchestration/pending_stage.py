from core.orchestration.context import PipelineContext


class PendingStage:
    """
    Handles conversations that are waiting for
    additional parameters from the customer.
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
            Response Agent should ask for the
            next missing parameter.
        """

        state = self.session.conversation_state

        if not state.is_waiting():
            return True

        context.planner_result = (
            state.fill_next_parameter(
                context.user_query
            )
        )

        if state.has_more_missing_parameters():
            return False

        state.clear()

        return True