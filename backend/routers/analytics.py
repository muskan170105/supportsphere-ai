from fastapi import APIRouter

from core.execution_logger import execution_logger

from repositories.analytics_repository import AnalyticsRepository
from schemas.analytics_schema import AnalyticsResponse

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)

repository = AnalyticsRepository()


@router.get(
    "",
    response_model=AnalyticsResponse,
)
def get_dashboard():

    dashboard = repository.get_dashboard_stats()

    execution = execution_logger.export() or {}

    response = {

        **dashboard,

        "planner": execution.get("planner") or {},

        "retriever": execution.get("retriever") or {},

        "tool": execution.get("tool") or {},

        "response_execution": execution.get("response") or {},

        "guardrail": execution.get("guardrail") or {},

        "memory_before": execution.get("memory_before") or {},

        "memory_after": execution.get("memory_after") or {},

        "timeline": execution.get("timeline") or [],

        "confidence": (
            execution.get("response") or {}
        ).get(
            "confidence",
            0.0,
        ),

        "confidence_level": (
            execution.get("response") or {}
        ).get(
            "confidence_level",
            "Unknown",
        ),

        "confidence_reason": (
            "Generated using planner, memory, "
            "tool execution and retrieved knowledge."
        ),

        "sources": (
            execution.get("retriever") or {}
        ).get(
            "sources",
            [],
        ),

    }

    return AnalyticsResponse(
        **response
    )