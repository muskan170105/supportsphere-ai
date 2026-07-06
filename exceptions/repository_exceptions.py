class RepositoryException(Exception):
    """
    Base repository exception.
    """
    pass


class OrderNotFoundException(RepositoryException):

    def __init__(self, order_id: str):
        super().__init__(
            f"Order '{order_id}' was not found."
        )


class PaymentNotFoundException(RepositoryException):

    def __init__(self, payment_id: str):
        super().__init__(
            f"Payment '{payment_id}' was not found."
        )


class UserNotFoundException(RepositoryException):

    def __init__(self, email: str):
        super().__init__(
            f"User '{email}' was not found."
        )