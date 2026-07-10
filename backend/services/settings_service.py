from threading import Lock


class SettingsService:

    def __init__(self):

        self.lock = Lock()

        # ==========================================
        # AI MODEL
        # ==========================================

        self.model = "Gemini 2.5 Flash"

        # ==========================================
        # FEATURES
        # ==========================================

        self.developer_mode = True

        self.conversation_memory = True

        self.analytics_tracking = True

        self.retrieval_cache = True

        self.guardrails = True

        # ==========================================
        # MODEL PARAMETERS
        # ==========================================

        self.temperature = 0.2

        self.max_tokens = 2048

        self.top_p = 0.95

    # ==================================================
    # GET SETTINGS
    # ==================================================

    def get_settings(self):

        with self.lock:

            return {

                "model": self.model,

                "developer_mode": self.developer_mode,

                "conversation_memory": self.conversation_memory,

                "analytics_tracking": self.analytics_tracking,

                "retrieval_cache": self.retrieval_cache,

                "guardrails": self.guardrails,

                "temperature": self.temperature,

                "max_tokens": self.max_tokens,

                "top_p": self.top_p,

            }

    # ==================================================
    # UPDATE SETTINGS
    # ==================================================

    def update_settings(
        self,
        data: dict,
    ):

        with self.lock:

            if "model" in data:
                self.model = data["model"]

            if "developer_mode" in data:
                self.developer_mode = data["developer_mode"]

            if "conversation_memory" in data:
                self.conversation_memory = data["conversation_memory"]

            if "analytics_tracking" in data:
                self.analytics_tracking = data["analytics_tracking"]

            if "retrieval_cache" in data:
                self.retrieval_cache = data["retrieval_cache"]

            if "guardrails" in data:
                self.guardrails = data["guardrails"]

            if "temperature" in data:
                self.temperature = data["temperature"]

            if "max_tokens" in data:
                self.max_tokens = data["max_tokens"]

            if "top_p" in data:
                self.top_p = data["top_p"]

        return self.get_settings()


settings_service = SettingsService()