from dataclasses import dataclass, field
from typing import Any

from schemas.planner_schema import PlannerOutput

from core.conversation.conversation_context import (
    ConversationContext,
)


@dataclass
class PipelineContext:
    """
    Shared state flowing through the orchestration pipeline.
    """

    # =====================================================
    # Request
    # =====================================================

    user_query: str

    start_time: float

    # =====================================================
    # Conversation
    # =====================================================

    conversation: ConversationContext | None = None

    chat_history: list = field(
        default_factory=list
    )

    working_memory: Any | None = None

    planner_required: bool = True

    # =====================================================
    # Planner
    # =====================================================

    planner_result: PlannerOutput | None = None

    # =====================================================
    # Retrieval
    # =====================================================

    retrieved_context: str | None = None

    retrieved_sources: list[str] = field(
        default_factory=list
    )

    # =====================================================
    # Tool
    # =====================================================

    tool_result: dict | None = None

    # =====================================================
    # Response
    # =====================================================

    answer: str | None = None

    # =====================================================
    # Guardrail
    # =====================================================

    guardrail_decision: str = "Passed"
    confirmation_required: bool = False
    confirmation_received: bool = False

    # =====================================================
    # Memory State
    # =====================================================

    memory_before_dict: dict | None = None
    memory_after_dict: dict | None = None