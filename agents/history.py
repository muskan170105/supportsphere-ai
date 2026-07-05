from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    SystemMessage,
)


class HistoryAgent:
    """
    History Agent

    Responsibilities
    ----------------
    - Store conversation history.
    - Return conversation history.
    - Format conversation history.
    - Clear conversation history.
    """

    def __init__(self):
        self.history = []

    def add_message(self, message):
        """Add any LangChain message."""
        self.history.append(message)

    def add_user_message(self, message: str):
        self.add_message(
            HumanMessage(content=message)
        )

    def add_ai_message(self, message: str):
        self.add_message(
            AIMessage(content=message)
        )

    def get_history(self):
        """
        Return a defensive copy of the history.
        """
        return self.history.copy()

    def format_history(self) -> str:
        """
        Convert conversation history into
        a readable text format for prompts.
        """

        if not self.history:
            return "No previous conversation."

        formatted = []

        for message in self.history:

            if isinstance(message, HumanMessage):
                role = "Customer"

            elif isinstance(message, AIMessage):
                role = "SupportSphereAI"

            elif isinstance(message, SystemMessage):
                role = "System"

            else:
                role = "Unknown"

            formatted.append(
                f"{role}: {message.content}"
            )

        return "\n".join(formatted)

    def clear_history(self):
        self.history.clear()