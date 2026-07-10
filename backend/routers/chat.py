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
    PlannerInspector,
    RetrieverInspector,
    ToolInspector,
    ResponseInspector,
    GuardrailInspector,
    MemoryInspector,
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

        result = orchestrator.run(
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

            response=result.response,

            confidence=result.confidence,

            confidence_level=result.confidence_level,

            confidence_reason=result.confidence_reason,

            sources=result.sources,

            planner=PlannerInspector(

                intent=result.planner.intent,

                need_rag=result.planner.need_rag,

                tool=result.planner.tool,

            ),

            retriever=RetrieverInspector(

                executed=result.retriever.executed,

                retrieved_documents=result.retriever.retrieved_documents,

                average_similarity=result.retriever.average_similarity,

                sources=result.retriever.sources,

            ),

            tool=ToolInspector(

                executed=result.tool.executed,

                tool_name=result.tool.tool_name,

            ),

            response_execution=ResponseInspector(

                latency=result.response_execution.latency,

                confidence=result.response_execution.confidence,

                confidence_level=result.response_execution.confidence_level,

            ),

            guardrail=GuardrailInspector(

                decision=result.guardrail.decision,

                confirmation_required=result.guardrail.confirmation_required,

                confirmation_received=result.guardrail.confirmation_received,

            ) if result.guardrail else None,

            memory_before=MemoryInspector(

                known_parameters=result.memory_before.known_parameters,

                missing_parameters=result.memory_before.missing_parameters,

                current_intent=result.memory_before.current_intent,

                current_tool=result.memory_before.current_tool,

            ) if result.memory_before else None,

            memory_after=MemoryInspector(

                known_parameters=result.memory_after.known_parameters,

                missing_parameters=result.memory_after.missing_parameters,

                current_intent=result.memory_after.current_intent,

                current_tool=result.memory_after.current_tool,

            ) if result.memory_after else None,

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