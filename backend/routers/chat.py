from fastapi import APIRouter, HTTPException

from core.dependencies import (
    get_orchestrator,
    session_manager,
)

from schemas.chat_schema import (
    StartChatResponse,
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse,
    ChatMessage,
    TimelineStep,
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


# ==========================================================
# Start Session
# ==========================================================

@router.post(
    "/start",
    response_model=StartChatResponse,
)
def start_chat():

    session_id = session_manager.create_session()

    return StartChatResponse(
        session_id=session_id
    )


# ==========================================================
# Chat
# ==========================================================

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

        session = session_manager.get_session(
            request.session_id
        )

        timeline = [
            TimelineStep(**step)
            for step in session.get_timeline()
        ]

        return ChatResponse(
            response=answer,
            timeline=timeline,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# ==========================================================
# Chat History
# ==========================================================

@router.get(
    "/history/{session_id}",
    response_model=ChatHistoryResponse,
)
def get_chat_history(session_id: str):

    session = session_manager.get_session(
        session_id
    )

    history = []

    for message in session.history.get_history():

        sender = (
            "Customer"
            if message.__class__.__name__ == "HumanMessage"
            else "AI"
        )

        history.append(
            ChatMessage(
                sender=sender,
                message=message.content,
            )
        )

    return ChatHistoryResponse(
        messages=history
    )


# ==========================================================
# Timeline
# ==========================================================

@router.get(
    "/timeline/{session_id}",
    response_model=list[TimelineStep],
)
def get_timeline(session_id: str):

    session = session_manager.get_session(
        session_id
    )

    return [
        TimelineStep(**step)
        for step in session.get_timeline()
    ]