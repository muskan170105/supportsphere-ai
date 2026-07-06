from data.orders import ORDERS


class OrderRepository:
    """
    Repository responsible for all order-related data access.
    """

    def get_order_by_id(self, order_id: str):
        """
        Retrieve an order by its ID.

        Args:
            order_id: Order identifier.

        Returns:
            dict | None
        """
        return ORDERS.get(order_id)