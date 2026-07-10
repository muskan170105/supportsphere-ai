from agents.history import HistoryAgent
from core.memory.conversation_state import ConversationState
class Session:
    """
    Represents one customer conversation session.

    Acts as the single source of truth for everything
    related to a customer's conversation.
    """

    def __init__(self):

        # Conversation History
        self.history = HistoryAgent()

        # Pending conversation state
        self.conversation_state = ConversationState()

        # Execution timeline
        self.timeline = []

        # Future extensibility
        self.metadata = {
            "customer_id": None,
            "conversation_id": None,
        }

    # =========================================================
    # Timeline
    # =========================================================

    def get_timeline(self):
        """
        Return a defensive copy of the timeline.
        """
        return self.timeline.copy()

    def set_timeline(self, steps):
        """
        Replace the current execution timeline.
        """

        self.timeline = steps.copy()

    def add_timeline_step(
        self,
        agent: str,
        status: str,
        description: str,
    ):
        self.timeline.append(
            {
                "agent": agent,
                "status": status,
                "description": description,
            }
        )

    def clear_timeline(self):
        self.timeline.clear()

    # =========================================================
    # Conversation
    # =========================================================

    def clear(self):
        """
        Reset the session for a fresh conversation.
        """

        self.history.clear_history()
        self.conversation_state.clear()
        self.clear_timeline()