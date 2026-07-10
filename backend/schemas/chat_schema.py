from pydantic import BaseModel, Field


# ==========================================================
# Timeline
# ==========================================================

class TimelineStep(BaseModel):

    agent: str

    status: str

    description: str


# ==========================================================
# Inspector Models
# ==========================================================

class PlannerInspector(BaseModel):

    intent: str

    need_rag: bool

    tool: str | None


class RetrieverInspector(BaseModel):

    executed: bool

    retrieved_documents: int

    average_similarity: float | None

    sources: list[str]


class ToolInspector(BaseModel):

    executed: bool

    tool_name: str | None


class ResponseInspector(BaseModel):

    latency: float

    confidence: float

    confidence_level: str


class GuardrailInspector(BaseModel):

    decision: str

    confirmation_required: bool

    confirmation_received: bool


class MemoryInspector(BaseModel):

    known_parameters: dict

    missing_parameters: list[str]

    current_intent: str | None

    current_tool: str | None


# ==========================================================
# Chat History
# ==========================================================

class ChatMessage(BaseModel):

    sender: str

    message: str


class ChatHistoryResponse(BaseModel):

    messages: list[ChatMessage]


# ==========================================================
# Start Chat
# ==========================================================

class StartChatResponse(BaseModel):

    session_id: str = Field(
        ...,
        description="Unique session id",
    )


# ==========================================================
# Chat Request
# ==========================================================

class ChatRequest(BaseModel):

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

    response: str

    confidence: float

    confidence_level: str

    confidence_reason: str

    sources: list[str]

    planner: PlannerInspector

    retriever: RetrieverInspector

    tool: ToolInspector

    response_execution: ResponseInspector

    guardrail: GuardrailInspector | None = None

    memory_before: MemoryInspector | None = None

    memory_after: MemoryInspector | None = None

    timeline: list[TimelineStep]