from data.payments import PAYMENTS


class PaymentRepository:
    """
    Repository responsible for all payment-related
    data access operations.
    """

    def get_payment_by_id(self, payment_id: str):
        """
        Retrieve a payment using its payment ID.

        Args:
            payment_id: Payment identifier.

        Returns:
            dict | None
        """
        return PAYMENTS.get(payment_id)