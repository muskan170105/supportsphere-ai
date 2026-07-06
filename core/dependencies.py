import os

from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
)

from agents.tool_agent import ToolAgent

from repositories.order_repository import OrderRepository
from repositories.payment_repository import PaymentRepository
from repositories.user_repository import UserRepository

from session.session_manager import SessionManager

from core.orchestrator import ConversationOrchestrator
from core.config import settings


if not settings.GOOGLE_API_KEY:
    raise ValueError(
        "GOOGLE_API_KEY not found."
    )


# ---------------------------------
# Models
# ---------------------------------

llm = ChatGoogleGenerativeAI(
    model=settings.CHAT_MODEL,
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=settings.TEMPERATURE,
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model=settings.EMBEDDING_MODEL,
    google_api_key=settings.GOOGLE_API_KEY,
)


# ---------------------------------
# Repositories
# ---------------------------------

order_repository = OrderRepository()

payment_repository = PaymentRepository()

user_repository = UserRepository()


# ---------------------------------
# Tool Agent
# ---------------------------------

tool_agent = ToolAgent(
    order_repository=order_repository,
    payment_repository=payment_repository,
    user_repository=user_repository,
)


# ---------------------------------
# Session Manager
# ---------------------------------

session_manager = SessionManager()


def get_orchestrator(session_id: str):

    session = session_manager.get_session(
        session_id
    )

    return ConversationOrchestrator(
        llm=llm,
        embedding_model=embedding_model,
        tool_agent=tool_agent,
        history_agent=session.history,
        conversation_state=session.conversation_state,
    )