from core.logger import logger
from core.execution_logger import execution_logger
from core.orchestration.context import PipelineContext

class GuardrailStage:
    """
    Enterprise Guardrail Stage to prevent unauthorized state-changing actions.
    Must be executed before the Tool Stage.
    """
    def __init__(self, session):
        self.session = session
        # Actions that require explicit user confirmation
        self.state_changing_tools = {
            "REFUND_REQUEST", "PASSWORD_RESET", "CANCEL_ORDER", 
            "REPLACE_ITEM", "DELETE_ACCOUNT", "ADDRESS_UPDATE", "CLOSE_TICKET"
        }

    def execute(self, context: PipelineContext):
        planner_result = context.planner_result
        memory = context.working_memory

        tool_to_execute = None
        if planner_result and planner_result.tool:
            tool_to_execute = planner_result.tool.value
        elif memory and memory.current_tool:
            tool_to_execute = memory.current_tool

        if not tool_to_execute:
            context.guardrail_decision = "Passed (No Tool)"
            context.confirmation_required = False
            context.confirmation_received = False
            return

        is_state_changing = tool_to_execute in self.state_changing_tools

        if is_state_changing:
            # Check if confirmation was explicitly received in this query
            # We can check the parameters to see if "confirmation" is set
            confirmation = False
            if memory and "confirmation" in memory.parameters:
                conf_val = str(memory.parameters.get("confirmation")).lower()
                if conf_val in ["yes", "true", "confirm", "confirmed"]:
                    confirmation = True

            if confirmation:
                context.guardrail_decision = "Passed (Confirmed)"
                context.confirmation_required = True
                context.confirmation_received = True
                logger.info("Guardrail Stage: Action Confirmed")
                execution_logger.log("Guardrail Stage", "Action Confirmed")
            else:
                context.guardrail_decision = "Blocked (Confirmation Required)"
                context.confirmation_required = True
                context.confirmation_received = False
                logger.info("Guardrail Stage: Action Blocked. Confirmation Required")
                execution_logger.log("Guardrail Stage", "Confirmation Required")
        else:
            context.guardrail_decision = "Passed (Safe Action)"
            context.confirmation_required = False
            context.confirmation_received = False
            logger.info("Guardrail Stage: Safe Action Passed")
            execution_logger.log("Guardrail Stage", "Safe Action Passed")

