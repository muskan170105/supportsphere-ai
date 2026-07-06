from threading import Lock


class AnalyticsService:

    def __init__(self):
        self.lock = Lock()

        self.total_conversations = 0
        self.total_response_time = 0.0

        self.order_tracking = 0
        self.refund_requests = 0
        self.payment_failures = 0
        self.password_resets = 0

        self.escalations = 0

    def record_request(
        self,
        intent: str,
        response_time: float,
    ):
        with self.lock:

            self.total_conversations += 1
            self.total_response_time += response_time

            if intent == "ORDER_TRACKING":
                self.order_tracking += 1

            elif intent == "REFUND_REQUEST":
                self.refund_requests += 1

            elif intent == "PAYMENT_FAILURE":
                self.payment_failures += 1

            elif intent == "PASSWORD_RESET":
                self.password_resets += 1

    def get_dashboard(self):

        avg_time = (
            self.total_response_time / self.total_conversations
            if self.total_conversations
            else 0
        )

        ai_resolution = (
            (
                (self.total_conversations - self.escalations)
                / self.total_conversations
            )
            * 100
            if self.total_conversations
            else 0
        )

        escalation_rate = (
            (self.escalations / self.total_conversations) * 100
            if self.total_conversations
            else 0
        )

        return {
            "total_conversations": self.total_conversations,
            "ai_resolution_rate": round(ai_resolution, 2),
            "avg_response_time": round(avg_time, 2),
            "escalation_rate": round(escalation_rate, 2),
            "order_tracking": self.order_tracking,
            "refund_requests": self.refund_requests,
            "payment_failures": self.payment_failures,
            "password_resets": self.password_resets,
        }


analytics_service = AnalyticsService()