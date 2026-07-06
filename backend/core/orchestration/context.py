from dataclasses import dataclass, field
from typing import Any

from schemas.planner_schema import PlannerOutput


@dataclass
class PipelineContext:
    """
    Shared state for a single request flowing through the
    orchestration pipeline.

    Each stage reads from and writes to this object instead
    of passing numerous arguments.
    """

    # Request
    user_query: str
    start_time: float

    # Conversation
    chat_history: list = field(default_factory=list)
    resolved_query: str | None = None

    # Planner
    planner_result: PlannerOutput | None = None

    # Retrieval
    retrieved_context: str | None = None

    # Tool
    tool_result: dict[str, Any] | None = None

    # Final response
    answer: str | None = None