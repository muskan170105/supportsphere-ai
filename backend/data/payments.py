PAYMENTS = {
    "pay_1001": {
        "customer_name": "Muskan",
        "status": "FAILED",
        "reason": "Insufficient Balance",
        "amount": 2499,
        "retry_allowed": True,
    },

    "pay_1002": {
        "customer_name": "Rahul",
        "status": "SUCCESS",
        "reason": None,
        "amount": 1599,
        "retry_allowed": False,
    },

    "pay_1003": {
        "customer_name": "Sneha",
        "status": "FAILED",
        "reason": "Bank Server Timeout",
        "amount": 799,
        "retry_allowed": True,
    },

    "pay_1004": {
        "customer_name": "Amit",
        "status": "FAILED",
        "reason": "Card Expired",
        "amount": 3499,
        "retry_allowed": False,
    },
}