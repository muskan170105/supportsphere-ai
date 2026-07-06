from pydantic import BaseModel


class AnalyticsResponse(BaseModel):
    total_conversations: int
    ai_resolution_rate: float
    avg_response_time: float
    escalation_rate: float

    order_tracking: int
    refund_requests: int
    payment_failures: int
    password_resets: int