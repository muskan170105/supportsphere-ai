from fastapi import APIRouter, HTTPException

from core.dependencies import (
    get_orchestrator,
    session_manager,
)

from schemas.chat_schema import (
    StartChatResponse,
    ChatRequest,
    ChatResponse,
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "/start",
    response_model=StartChatResponse,
)
def start_chat():
    """
    Start a new chat session.
    """

    session_id = session_manager.create_session()

    return StartChatResponse(
        session_id=session_id
    )


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    try:

        orchestrator = get_orchestrator(
            request.session_id
        )

        answer = orchestrator.run(
            request.message
        )

        return ChatResponse(
            response=answer
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )