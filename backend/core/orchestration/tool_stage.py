from core.logger import logger

from core.orchestration.context import PipelineContext


class ToolStage:
    """
    Executes the business tool selected
    by the Planner Agent.
    """

    def __init__(
        self,
        tool_agent,
    ):
        self.tool_agent = tool_agent

    def execute(
        self,
        context: PipelineContext,
    ):
        """
        Execute the selected business tool.

        If no tool is required, this stage
        exits immediately.
        """

        if context.planner_result is None:
            raise ValueError(
                "Planner result is missing."
            )

        if context.planner_result.tool is None:
            return

        logger.info(
            f"Executing Tool : "
            f"{context.planner_result.tool}"
        )

        context.tool_result = self.tool_agent.execute(
            context.planner_result
        )

        logger.info(
            "Tool execution completed."
        )