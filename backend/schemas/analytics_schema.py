from typing import Any

from pydantic import BaseModel


class PlannerAnalytics(BaseModel):
    intent: str | None = None
    need_rag: bool = False
    tool: str | None = None


class RetrieverAnalytics(BaseModel):
    executed: bool = False
    retrieved_documents: int = 0
    average_similarity: float | None = None
    sources: list[str] = []


class ToolAnalytics(BaseModel):
    executed: bool = False
    tool_name: str | None = None
    result: Any = None


class ResponseExecution(BaseModel):
    latency: float = 0.0
    confidence: float = 0.0
    confidence_level: str = "Unknown"
    answer_length: int = 0


class GuardrailAnalytics(BaseModel):
    decision: str | None = None
    confirmation_required: bool = False
    confirmation_received: bool = False


class TimelineStep(BaseModel):
    agent: str
    status: str
    description: str


class AnalyticsResponse(BaseModel):

    # ================================
    # Dashboard Metrics
    # ================================

    total_conversations: int
    ai_resolution_rate: float
    avg_response_time: float
    escalation_rate: float

    order_tracking: int
    refund_requests: int
    payment_failures: int
    password_resets: int

    # ================================
    # Latest Execution Inspector
    # ================================

    planner: PlannerAnalytics | None = None

    retriever: RetrieverAnalytics | None = None

    tool: ToolAnalytics | None = None

    response_execution: ResponseExecution | None = None

    guardrail: GuardrailAnalytics | None = None

    memory_before: dict = {}

    memory_after: dict = {}

    timeline: list[TimelineStep] = []

    confidence: float = 0.0

    confidence_level: str = "Unknown"

    confidence_reason: str = ""

    sources: list[str] = []