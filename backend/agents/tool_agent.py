import inspect

from tools.tracking_tool import TrackingTool
from tools.refund_tool import RefundTool
from tools.payment_tool import PaymentTool
from tools.password_tool import PasswordTool

from exceptions.tool_exceptions import (
    ToolNotFoundException,
)

from core.execution_logger import execution_logger


class ToolAgent:
    """
    Executes the business tool selected by the Planner Agent.

    Only the parameters required by the selected
    tool are forwarded.
    """

    def __init__(
        self,
        order_repository,
        payment_repository,
        user_repository,
    ):

        self.tools = {

            "ORDER_TRACKING": TrackingTool(
                order_repository
            ),

            "REFUND_REQUEST": RefundTool(
                order_repository
            ),

            "PAYMENT_FAILURE": PaymentTool(
                order_repository,
                payment_repository,
            ),

            "PASSWORD_RESET": PasswordTool(
                user_repository
            ),
        }

    def execute(
        self,
        planner_result,
    ):

        tool = self.tools.get(
            planner_result.tool
        )

        if tool is None:

            raise ToolNotFoundException(
                planner_result.tool
            )

        parameters = planner_result.parameters or {}

        # ==========================================
        # Forward only parameters accepted
        # by the selected tool.
        # ==========================================

        signature = inspect.signature(
            tool.execute
        )

        filtered_parameters = {

            name: value

            for name, value in parameters.items()

            if name in signature.parameters

        }

        result = tool.execute(
            **filtered_parameters
        )

        execution_logger.log(

            "Tool Agent",

            f"Executed {planner_result.tool}",

        )

        return result