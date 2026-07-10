from dataclasses import dataclass, field


@dataclass
class PlannerExecution:

    intent: str

    need_rag: bool

    tool: str | None


@dataclass
class RetrieverExecution:

    executed: bool

    retrieved_documents: int

    average_similarity: float | None

    sources: list[str] = field(
        default_factory=list,
    )


@dataclass
class ToolExecution:

    executed: bool

    tool_name: str | None


@dataclass
class ResponseExecution:

    latency: float

    confidence: float

    confidence_level: str


@dataclass
class GuardrailExecution:

    decision: str

    confirmation_required: bool

    confirmation_received: bool


@dataclass
class MemoryExecution:

    known_parameters: dict

    missing_parameters: list[str]

    current_intent: str | None

    current_tool: str | None


@dataclass
class OrchestratorResult:
    """
    Final output produced by the orchestration pipeline.
    """

    # AI Response

    response: str

    sources: list[str] = field(
        default_factory=list,
    )

    # Confidence

    confidence: float = 0.0

    confidence_level: str = "Low"

    confidence_reason: str = ""

    # Execution Metadata

    planner: PlannerExecution | None = None

    tool: ToolExecution | None = None

    response_execution: ResponseExecution | None = None

    guardrail: GuardrailExecution | None = None

    memory_before: MemoryExecution | None = None

    memory_after: MemoryExecution | None = None