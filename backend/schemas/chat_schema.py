from pydantic import BaseModel, Field


class StartChatResponse(BaseModel):
    """
    Response returned when a new chat session starts.
    """

    session_id: str = Field(
        ...,
        description="Unique session identifier",
    )


class ChatRequest(BaseModel):
    """
    Incoming chat request.
    """

    session_id: str = Field(
        ...,
        description="Unique session identifier",
    )

    message: str = Field(
        ...,
        description="Customer message",
        examples=["Track order 12345"],
    )


class ChatResponse(BaseModel):
    """
    AI response.
    """

    response: str