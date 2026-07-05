from tools.base_tool import BaseTool


class TrackingTool(BaseTool):
    """
    Business tool responsible for tracking customer orders.
    """

    def __init__(self, order_repository):
        self.order_repository = order_repository

    def execute(self, order_id: str):

        order = self.order_repository.get_order_by_id(order_id)

        if order is None:
            return {
                "success": False,
                "message": f"Order '{order_id}' was not found.",
            }

        return {
            "success": True,
            "order_id": order_id,
            "customer_name": order["customer_name"],
            "status": order["status"],
            "estimated_delivery": order["estimated_delivery"],
        }