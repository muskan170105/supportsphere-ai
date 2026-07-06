class SessionException(Exception):
    """
    Base exception for session-related errors.
    """
    pass


class InvalidSessionException(SessionException):
    """
    Raised when a session ID does not exist.
    """

    def __init__(self, session_id: str):
        super().__init__(
            f"Session '{session_id}' does not exist."
        )