from tools.tracking_tool import TrackingTool
from tools.refund_tool import RefundTool
from tools.payment_tool import PaymentTool
from tools.password_tool import PasswordTool


class ToolAgent:
    """
    Executes business tools selected by the Planner Agent.
    """

    def __init__(
        self,
        order_repository,
        payment_repository,
        user_repository,
    ):

        self.tools = {
            "ORDER_TRACKING": TrackingTool(order_repository),

            "REFUND_REQUEST": RefundTool(order_repository),

            "PAYMENT_FAILURE": PaymentTool(
                order_repository,
                payment_repository,
            ),

            "PASSWORD_RESET": PasswordTool(
                user_repository,
            ),
        }

    def execute(self, planner_result):
        """
        Execute the selected business tool.
        """

        if planner_result.tool is None:
            return None

        tool = self.tools.get(planner_result.tool)

        if tool is None:
            raise ValueError(
                f"Unknown tool: {planner_result.tool}"
            )

        return tool.execute(
            **planner_result.parameters
        )