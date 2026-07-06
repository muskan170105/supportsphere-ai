import logging
import os

from core.config import settings


os.makedirs(
    settings.LOG_DIRECTORY,
    exist_ok=True,
)


logger = logging.getLogger("SupportSphereAI")

logger.setLevel(settings.LOG_LEVEL)


formatter = logging.Formatter(
    fmt="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


# -----------------------------
# Console
# -----------------------------
console_handler = logging.StreamHandler()

console_handler.setFormatter(formatter)


# -----------------------------
# File
# -----------------------------
file_handler = logging.FileHandler(
    os.path.join(
        settings.LOG_DIRECTORY,
        settings.LOG_FILE,
    ),
    encoding="utf-8",
)

file_handler.setFormatter(formatter)


if not logger.handlers:
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)