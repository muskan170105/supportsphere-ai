from dataclasses import dataclass, field

from core.conversation.retrieval_cache import (
    RetrievalCache,
)


@dataclass
class WorkingMemory:
    """
    Active conversational memory.

    Stores everything required to continue
    an ongoing conversation.
    """

    # =====================================================
    # Active Task
    # =====================================================

    current_intent: str | None = None

    current_tool: str | None = None

    task_completed: bool = False

    # =====================================================
    # Entity Memory
    # =====================================================

    entities: dict = field(default_factory=dict)

    parameters: dict = field(default_factory=dict)

    missing_parameters: list[str] = field(default_factory=list)

    # =====================================================
    # Retrieval Memory
    # =====================================================

    retrieval_cache: RetrievalCache = field(
        default_factory=RetrievalCache
    )

    # =====================================================
    # Execution Memory
    # =====================================================

    last_tool_result: dict | None = None

    last_retrieved_sources: list[str] = field(
        default_factory=list
    )

    last_answer: str | None = None

    conversation_summary: str = ""

    # =====================================================
    # Conversation Metadata
    # =====================================================

    last_user_message: str | None = None

    last_intent_change: int = 0

    turn_count: int = 0

    # =====================================================

    def has_active_task(self):

        return (
            self.current_intent is not None
            and not self.task_completed
        )

    # =====================================================

    def start_new_turn(
        self,
        user_message: str,
    ):

        self.turn_count += 1
        self.last_user_message = user_message

    # =====================================================

    def remember_entity(
        self,
        name: str,
        value,
    ):

        self.entities[name] = value
        self.parameters[name] = value

    # =====================================================

    def get_entity(
        self,
        name: str,
    ):

        return self.entities.get(name)

    # =====================================================

    def has_entity(
        self,
        name: str,
    ):

        return name in self.entities

    # =====================================================

    def complete_task(self):

        self.task_completed = True

    # =====================================================

    def reopen_task(self):

        self.task_completed = False

    # =====================================================
    # NEW
    # =====================================================

    def switch_intent(
        self,
        new_intent: str,
        new_tool=None,
    ):
        """
        Clean task-specific state while preserving
        reusable customer information.
        """

        if new_intent == self.current_intent:
            return

        self.current_intent = new_intent
        self.current_tool = new_tool
        self.task_completed = False

        # Clear task state
        self.missing_parameters.clear()

        self.retrieval_cache.clear()

        self.last_tool_result = None

        self.last_retrieved_sources.clear()

        self.last_answer = None

        self.conversation_summary = ""

        self.last_intent_change = self.turn_count

        # Keep only reusable parameters
        keep = {
            "order_id",
            "customer_id",
            "email",
            "phone",
            "username",
            "account_id",
        }

        self.entities = {
            k: v
            for k, v in self.entities.items()
            if k in keep
        }

        self.parameters = {
            k: v
            for k, v in self.parameters.items()
            if k in keep
        }

    # =====================================================

    def reset(self):

        self.current_intent = None
        self.current_tool = None
        self.task_completed = False

        self.entities.clear()
        self.parameters.clear()
        self.missing_parameters.clear()

        self.retrieval_cache.clear()

        self.last_tool_result = None
        self.last_retrieved_sources.clear()
        self.last_answer = None

        self.conversation_summary = ""

        self.last_user_message = None
        self.last_intent_change = 0
        self.turn_count = 0