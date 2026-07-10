from fastapi import APIRouter

from repositories.settings_repository import (
    settings_repository,
)

from schemas.settings_schema import (
    SettingsResponse,
    SettingsUpdateRequest,
)

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


@router.get(
    "",
    response_model=SettingsResponse,
)
def get_settings():

    data = settings_repository.get_settings()

    return SettingsResponse(
        **data,
    )


@router.put(
    "",
    response_model=SettingsResponse,
)
def update_settings(
    request: SettingsUpdateRequest,
):

    data = settings_repository.update_settings(

        request.model_dump(
            exclude_none=True
        )

    )

    return SettingsResponse(
        **data,
    )