from dataclasses import dataclass, field
from typing import Any


@dataclass
class WorkingMemory:
    """
    Stores the current conversational context.

    Unlike chat history, this represents what the
    assistant currently knows about the user's task.
    """

    current_intent: str | None = None

    current_tool: str | None = None

    parameters: dict = field(default_factory=dict)

    missing_parameters: list[str] = field(default_factory=list)

    last_tool_result: dict | None = None

    last_retrieved_sources: list[str] = field(default_factory=list)

    last_answer: str | None = None

    entities: dict = field(default_factory=dict)

    conversation_summary: str = ""

    retrieval_cache: Any | None = None

    # =====================================================

    def has_active_task(self):
        return self.current_intent is not None

    # =====================================================

    def switch_intent(self, planner_result):
        """
        Start a new task while preserving reusable customer
        information and clearing task-specific state.
        """

        if (
            self.current_intent is not None
            and self.current_intent != planner_result.intent.value
        ):
            self.last_tool_result = None
            self.last_answer = None
            self.last_retrieved_sources.clear()
            self.conversation_summary = ""

            if self.retrieval_cache:
                self.retrieval_cache.clear()

        self.current_intent = planner_result.intent.value

        self.current_tool = (
            planner_result.tool.value
            if planner_result.tool
            else None
        )

        reusable = {
            "order_id",
            "customer_id",
            "email",
            "phone",
            "username",
            "account_id",
        }

        merged = {
            k: v
            for k, v in self.parameters.items()
            if k in reusable
        }

        merged.update(planner_result.parameters)

        self.parameters = merged

        self.entities.update(merged)

        self.missing_parameters = list(
            planner_result.missing_parameters
        )

    # =====================================================

    def update_from_planner(
        self,
        planner_result,
    ):
        self.switch_intent(planner_result)

    # =====================================================

    def update_parameter(
        self,
        key,
        value,
    ):
        self.parameters[key] = value
        self.entities[key] = value

        if key in self.missing_parameters:
            self.missing_parameters.remove(key)

    # =====================================================

    def remember_tool_result(
        self,
        result,
    ):
        self.last_tool_result = result

    # =====================================================

    def remember_sources(
        self,
        sources,
    ):
        self.last_retrieved_sources = sources.copy()

    # =====================================================

    def remember_answer(
        self,
        answer,
    ):
        self.last_answer = answer

    # =====================================================

    def clear(self):
        self.current_intent = None
        self.current_tool = None

        self.parameters.clear()
        self.missing_parameters.clear()

        self.last_tool_result = None
        self.last_retrieved_sources.clear()
        self.last_answer = None

        self.entities.clear()

        self.conversation_summary = ""

        if self.retrieval_cache:
            self.retrieval_cache.clear()


class ConversationState:
    """
    Maintains pending slot filling.

    Uses WorkingMemory underneath.
    """

    def __init__(self):
        self.memory = WorkingMemory()

    # =====================================================

    def is_waiting(self):
        return len(self.memory.missing_parameters) > 0

    # =====================================================

    def has_more_missing_parameters(self):
        return self.is_waiting()

    # =====================================================

    def fill_next_parameter(
        self,
        value,
    ):
        if not self.memory.missing_parameters:
            return None

        parameter = self.memory.missing_parameters[0]

        self.memory.update_parameter(
            parameter,
            value,
        )

        return None

    # =====================================================

    def update_from_planner(
        self,
        planner_result,
    ):
        self.memory.update_from_planner(
            planner_result
        )

    # =====================================================

    def update_summary(self, summary: str):
        self.memory.conversation_summary = summary

    # =====================================================

    def clear(self):
        self.memory.clear()