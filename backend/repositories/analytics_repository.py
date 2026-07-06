from services.analytics_service import analytics_service


class AnalyticsRepository:

    def get_dashboard_stats(self):
        return analytics_service.get_dashboard()