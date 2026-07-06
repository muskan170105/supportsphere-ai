from fastapi import APIRouter

from schemas.timeline_schema import TimelineStep

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"],
)

timeline = [
    TimelineStep(
        agent="Planner Agent",
        status="Completed",
        description="Detected ORDER_TRACKING intent",
    ),
    TimelineStep(
        agent="Tool Agent",
        status="Completed",
        description="Selected Tracking Tool",
    ),
    TimelineStep(
        agent="Tracking Tool",
        status="Completed",
        description="Fetched Order #12345",
    ),
    TimelineStep(
        agent="Response Agent",
        status="Completed",
        description="Generated final response",
    ),
]


@router.get("", response_model=list[TimelineStep])
def get_timeline():
    return timeline