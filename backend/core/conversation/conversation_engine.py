from enum import Enum
import re

from core.conversation.conversation_context import ConversationContext
from core.conversation.entity_extractor import EntityExtractor
from core.memory.working_memory import WorkingMemory


class ConversationDecision(Enum):
    RUN_PLANNER = "RUN_PLANNER"
    FOLLOW_UP = "FOLLOW_UP"
    SLOT_FILLING = "SLOT_FILLING"
    PARAMETER_CORRECTION = "PARAMETER_CORRECTION"
    INTENT_SWITCH = "INTENT_SWITCH"


FOLLOW_UP_WORDS = {
    "it",
    "its",
    "that",
    "this",
    "them",
    "they",
    "there",
    "arrive",
    "arrival",
    "delivery",
    "deliver",
    "status",
    "where",
    "when",
    "again",
    "same",
    "also",
    "too",
    "then",
    "next",
    "previous",
    "before",
    "earlier",
}


CORRECTION_WORDS = {
    "actually",
    "instead",
    "change",
    "update",
    "use",
    "correct",
    "no",
    "wrong",
    "replace",
}


INTENT_KEYWORDS = {
    "ORDER_TRACKING": {
        "track",
        "tracking",
        "delivery",
        "order",
    },
    "REFUND_REQUEST": {
        "refund",
        "return",
        "refunds",
    },
    "PASSWORD_RESET": {
        "password",
        "reset",
        "login",
    },
    "PAYMENT_FAILURE": {
        "payment",
        "failed",
        "transaction",
        "pay",
    },
}


class ConversationEngine:

    def __init__(self):
        self.extractor = EntityExtractor()

    def _tokenize(self, text: str) -> set[str]:
        return set(re.findall(r"\b[a-zA-Z0-9_]+\b", text.lower()))

    def _contains_word(self, query: str, words: set[str]) -> bool:
        tokens = self._tokenize(query)
        return not tokens.isdisjoint(words)

    def analyze(
        self,
        query: str,
        memory: WorkingMemory,
    ):
        context = ConversationContext.from_memory(
            query,
            memory,
        )

        extracted = self.extractor.extract(query)

        if extracted:
            context.entities.update(extracted)
            context.parameters.update(extracted)

        # Fresh conversation
        if not memory.has_active_task():
            context.decision = ConversationDecision.RUN_PLANNER
            return context

        # Intent Switch (highest priority)
        for intent, keywords in INTENT_KEYWORDS.items():
            if (
                intent != memory.current_intent
                and self._contains_word(query, keywords)
            ):
                context.decision = ConversationDecision.INTENT_SWITCH
                return context

        # Parameter Correction
        if self._contains_word(query, CORRECTION_WORDS):
            context.decision = ConversationDecision.PARAMETER_CORRECTION
            return context

        # Follow-up
        if self._contains_word(query, FOLLOW_UP_WORDS):
            context.decision = ConversationDecision.FOLLOW_UP
            return context

        # Slot Filling
        if memory.missing_parameters:
            extracted_keys = set(extracted.keys()) if extracted else set()

            if extracted_keys.intersection(set(memory.missing_parameters)):
                context.decision = ConversationDecision.SLOT_FILLING
                return context

        context.decision = ConversationDecision.RUN_PLANNER
        return context