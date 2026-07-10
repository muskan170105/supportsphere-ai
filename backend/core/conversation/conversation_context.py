from dataclasses import dataclass, field


@dataclass
class ConversationContext:
    """
    Shared conversation state.

    Every stage should use this object
    instead of reading multiple sources.
    """

    # =====================================================
    # Request
    # =====================================================

    user_query: str

    decision: str | None = None

    # =====================================================
    # Active Task
    # =====================================================

    intent: str | None = None

    tool: str | None = None

    # =====================================================
    # Memory
    # =====================================================

    entities: dict = field(
        default_factory=dict
    )

    parameters: dict = field(
        default_factory=dict
    )

    missing_parameters: list[str] = field(
        default_factory=list
    )

    summary: str = ""

    # =====================================================
    # Retrieval
    # =====================================================

    retrieved_context: str | None = None

    retrieved_sources: list[str] = field(
        default_factory=list
    )

    reuse_cached_retrieval: bool = False

    # =====================================================
    # Tool
    # =====================================================

    tool_result: dict | None = None

    # =====================================================
    # Response
    # =====================================================

    answer: str | None = None

    confidence: float = 0.0

    confidence_reason: str = ""

    @classmethod
    def from_memory(
        cls,
        user_query,
        memory,
    ):

        context = cls(

            user_query=user_query,

            intent=memory.current_intent,

            tool=memory.current_tool,

            entities=dict(
                memory.entities
            ),

            parameters=dict(
                memory.parameters
            ),

            missing_parameters=list(
                memory.missing_parameters
            ),

            summary=memory.conversation_summary,

        )

        context.retrieved_context = (
            memory.retrieval_cache.context if memory.retrieval_cache else None
        )

        context.retrieved_sources = list(
            memory.retrieval_cache.sources if memory.retrieval_cache else []
        )

        return context