from core.logger import logger
from core.execution_logger import execution_logger

from core.orchestration.context import PipelineContext


class ToolStage:
    """
    Executes business tools.

    Supports:
    1. Fresh planner execution
    2. Follow-up execution
    3. Slot-filled execution
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

        # ==========================================
        # Confirmation Required
        # ==========================================

        if (
            context.confirmation_required
            and not context.confirmation_received
        ):

            logger.info(
                "Tool execution skipped due to missing confirmation."
            )

            execution_logger.log(
                "Tool Agent",
                "Execution skipped (Confirmation Required)",
            )

            return

        planner_result = context.planner_result

        # ==========================================
        # Planner skipped → Continue current task
        # ==========================================

        if planner_result is None:

            memory = context.working_memory

            if (
                memory is None
                or memory.current_tool is None
            ):

                logger.info(
                    "No active tool found."
                )

                execution_logger.log(
                    "Tool Agent",
                    "Skipped (No Active Tool)",
                )

                return

            logger.info(
                "Executing active tool from memory."
            )

            class PlannerLike:
                pass

            planner_result = PlannerLike()

            planner_result.tool = memory.current_tool
            planner_result.parameters = dict(
                memory.parameters
            )

        # ==========================================
        # Validate Parameters
        # ==========================================

        parameters = getattr(
            planner_result,
            "parameters",
            {},
        )

        if parameters is None:
            parameters = {}

        logger.info(
            f"Executing Tool : {planner_result.tool}"
        )

        execution_logger.log(
            "Tool Agent",
            f"Executed {planner_result.tool}",
        )

        # ==========================================
        # Execute
        # ==========================================

        context.tool_result = self.tool_agent.execute(
            planner_result
        )

        # ==========================================
        # Update Working Memory
        # ==========================================

        if context.working_memory:

            memory = context.working_memory

            memory.current_tool = planner_result.tool

            memory.parameters.update(parameters)

            memory.last_tool_result = context.tool_result

        logger.info(
            "Tool execution completed."
        )