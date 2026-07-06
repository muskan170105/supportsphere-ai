import uuid

from session.session import Session

from exceptions.session_exceptions import (
    InvalidSessionException,
)


class SessionManager:
    """
    Manages all active customer sessions.
    """

    def __init__(self):

        self.sessions = {}

    # ---------------------------------------------------------
    # Session Lifecycle
    # ---------------------------------------------------------

    def create_session(self) -> str:

        session_id = str(uuid.uuid4())

        self.sessions[session_id] = Session()

        return session_id

    def get_session(self, session_id: str) -> Session:

        session = self.sessions.get(session_id)

        if session is None:
            raise InvalidSessionException(session_id)

        return session

    def clear_session(self, session_id: str):

        self.sessions.pop(session_id, None)

    # ---------------------------------------------------------
    # Timeline Helpers
    # ---------------------------------------------------------

    def get_timeline(self, session_id: str):

        session = self.get_session(session_id)

        return session.get_timeline()

    def clear_timeline(self, session_id: str):

        session = self.get_session(session_id)

        session.clear_timeline()

    def add_timeline_step(
        self,
        session_id: str,
        agent: str,
        status: str,
        description: str,
    ):

        session = self.get_session(session_id)

        session.add_timeline_step(
            agent=agent,
            status=status,
            description=description,
        )