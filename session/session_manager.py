import uuid

from agents.history import HistoryAgent
from state.conversation_state import ConversationState

from exceptions.session_exceptions import (
    InvalidSessionException,
)


class Session:
    """
    Represents one customer session.
    """

    def __init__(self):
        self.history = HistoryAgent()
        self.conversation_state = ConversationState()


class SessionManager:

    def __init__(self):
        self.sessions = {}

    def create_session(self):

        session_id = str(uuid.uuid4())

        self.sessions[session_id] = Session()

        return session_id

    def get_session(self, session_id: str):

        session = self.sessions.get(session_id)

        if session is None:
            raise InvalidSessionException(
                session_id
            )

        return session

    def clear_session(self, session_id: str):

        self.sessions.pop(session_id, None)