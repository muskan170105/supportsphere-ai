from services.settings_service import (
    settings_service,
)


class SettingsRepository:

    def get_settings(self):

        return settings_service.get_settings()

    def update_settings(
        self,
        data: dict,
    ):

        return settings_service.update_settings(
            data
        )


settings_repository = (
    SettingsRepository()
)