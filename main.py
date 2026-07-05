from dotenv import load_dotenv
import os

from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
)

from agents.tool_agent import ToolAgent
from agents.history import HistoryAgent

from repositories.order_repository import OrderRepository
from repositories.payment_repository import PaymentRepository
from repositories.user_repository import UserRepository

from state.conversation_state import ConversationState

from core.orchestrator import ConversationOrchestrator


# ---------------------------------
# Load Environment Variables
# ---------------------------------
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env")


# ---------------------------------
# Initialize Models
# ---------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=api_key,
    temperature=0,
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=api_key,
)


# ---------------------------------
# Initialize Repositories
# ---------------------------------
order_repository = OrderRepository()

payment_repository = PaymentRepository()

user_repository = UserRepository()


# ---------------------------------
# Initialize Agents
# ---------------------------------
tool_agent = ToolAgent(
    order_repository=order_repository,
    payment_repository=payment_repository,
    user_repository=user_repository,
)

history_agent = HistoryAgent()

conversation_state = ConversationState()


# ---------------------------------
# Initialize Orchestrator
# ---------------------------------
orchestrator = ConversationOrchestrator(
    llm=llm,
    embedding_model=embedding_model,
    tool_agent=tool_agent,
    history_agent=history_agent,
    conversation_state=conversation_state,
)


# ---------------------------------
# Chat Loop
# ---------------------------------
print("=" * 50)
print("        Welcome to SupportSphere AI")
print("Type 'exit' to quit.")
print("=" * 50)

while True:

    user_query = input("\nYou: ")

    if user_query.lower() == "exit":
        print("\nSupportSphere AI: Goodbye!")
        break

    try:
        answer = orchestrator.run(user_query)
        print(f"\nSupportSphere AI:\n{answer}")

    except Exception as e:
        print(f"\nError: {e}")