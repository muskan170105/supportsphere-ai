from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.chat import router as chat_router
from routers.conversations import router as conversation_router
from routers.knowledge_base import (
    router as knowledge_base_router,
)


app = FastAPI(
    title="SupportSphere AI",
    version="1.0.0",
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Health Check
# ==========================================================

@app.get("/")
def root():

    return {
        "message": "SupportSphere AI Backend Running"
    }


# ==========================================================
# Routers
# ==========================================================

app.include_router(chat_router)

app.include_router(conversation_router)

app.include_router(
    knowledge_base_router
)