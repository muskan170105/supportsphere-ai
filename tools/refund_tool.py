from tools.base_tool import BaseTool


class RefundTool(BaseTool):
    """
    Business tool responsible for processing refunds.
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

        if order["refunded"]:
            return {
                "success": False,
                "message": "This order has already been refunded.",
            }

        if order["purchase_days_ago"] > 7:
            return {
                "success": False,
                "message": "The refund period has expired.",
            }

        order["refunded"] = True

        return {
            "success": True,
            "order_id": order_id,
            "message": "Your refund request has been created successfully.",
        }