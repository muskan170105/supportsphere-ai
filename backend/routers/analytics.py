from fastapi import APIRouter

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

    data = repository.get_dashboard_stats()

    return AnalyticsResponse(**data)