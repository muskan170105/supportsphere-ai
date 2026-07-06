from pydantic import BaseModel, Field


# ==========================================================
# Timeline
# ==========================================================

class TimelineStep(BaseModel):
    """
    One AI execution step.
    """

    agent: str

    status: str

    description: str


# ==========================================================
# Chat History
# ==========================================================

class ChatMessage(BaseModel):
    """
    One chat message.
    """

    sender: str

    message: str


class ChatHistoryResponse(BaseModel):
    """
    Chat history.
    """

    messages: list[ChatMessage]


# ==========================================================
# Start Chat
# ==========================================================

class StartChatResponse(BaseModel):
    """
    Returned when a new chat session starts.
    """

    session_id: str = Field(
        ...,
        description="Unique session id",
    )


# ==========================================================
# Chat Request
# ==========================================================

class ChatRequest(BaseModel):
    """
    Incoming customer request.
    """

    session_id: str = Field(
        ...,
        description="Conversation session",
    )

    message: str = Field(
        ...,
        description="Customer message",
    )


# ==========================================================
# Chat Response
# ==========================================================

class ChatResponse(BaseModel):
    """
    AI response.
    """

    response: str

    timeline: list[TimelineStep]