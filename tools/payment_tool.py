from tools.base_tool import BaseTool


class PaymentTool(BaseTool):
    """
    Business tool responsible for payment operations.
    """

    def __init__(
        self,
        order_repository,
        payment_repository,
    ):
        self.order_repository = order_repository
        self.payment_repository = payment_repository

    def execute(self, order_id: str):

        order = self.order_repository.get_order_by_id(order_id)

        if order is None:
            return {
                "success": False,
                "message": f"Order '{order_id}' was not found.",
            }

        payment_id = order["payment_id"]

        payment = self.payment_repository.get_payment_by_id(
            payment_id
        )

        if payment is None:
            return {
                "success": False,
                "message": "Payment record not found.",
            }

        return {
            "success": True,
            "order_id": order_id,
            "payment_id": payment_id,
            "payment_status": payment["status"],
            "amount": payment["amount"],
            "reason": payment["reason"],
            "retry_allowed": payment["retry_allowed"],
        }