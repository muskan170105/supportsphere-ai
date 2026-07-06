from fastapi import FastAPI

from routers.chat import router as chat_router

from core.config import settings


app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
)


app.include_router(chat_router)