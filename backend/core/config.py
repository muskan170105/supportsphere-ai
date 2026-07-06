import os

from dotenv import load_dotenv


load_dotenv()

MOCK_MODE=True

class Settings:
    """
    Central configuration for SupportSphere AI.
    """

    # ---------------------------------
    # Gemini
    # ---------------------------------
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    CHAT_MODEL = "gemini-2.5-flash"

    EMBEDDING_MODEL = "models/gemini-embedding-001"

    TEMPERATURE = 0

    # ---------------------------------
    # Chroma
    # ---------------------------------
    CHROMA_DB_PATH = "chroma_db"

    # ---------------------------------
    # Logging
    # ---------------------------------
    LOG_DIRECTORY = "logs"

    LOG_FILE = "supportsphere.log"

    LOG_LEVEL = "INFO"

    # ---------------------------------
    # FastAPI
    # ---------------------------------
    API_TITLE = "SupportSphere AI"

    API_VERSION = "2.1.0"

    API_DESCRIPTION = (
        "Enterprise AI-powered customer support backend."
    )


settings = Settings()