from core.logger import logger

from core.conversation.conversation_engine import (
    ConversationEngine,
    ConversationDecision,
)

from core.orchestration.context import PipelineContext


class MemoryStage:

    def __init__(
        self,
        session,
    ):
        self.session = session

        self.engine = ConversationEngine()

    def execute(
        self,
        context: PipelineContext,
    ):

        logger.info(
            "Running Memory Stage..."
        )

        memory = (
            self.session
            .conversation_state
            .memory
        )

        print("=" * 60)
        print(type(memory))
        print(memory.__class__.__module__)
        print(memory.__dict__)
        print(hasattr(memory, "entities"))
        print("=" * 60)

        context.working_memory = memory

        conversation = self.engine.analyze(

            query=context.user_query,

            memory=memory,

        )

        context.conversation = conversation

        logger.info(

            f"Conversation Decision : {conversation.decision.value}"

        )

        # ==========================================
        # Planner
        # ==========================================

        if (

            conversation.decision

            == ConversationDecision.RUN_PLANNER

        ):

            context.planner_required = True

            return

        # ==========================================
        # Slot Filling
        # ==========================================

        if (

            conversation.decision

            == ConversationDecision.SLOT_FILLING

        ):

            parameter = (

                conversation.missing_parameters[0]

            )

            self.session.conversation_state.update_parameter(

                parameter,

                context.user_query,

            )

            context.conversation.parameters[

                parameter

            ] = context.user_query

            context.planner_required = False

            return

        # ==========================================
        # Follow-up
        # ==========================================

        if (

            conversation.decision

            == ConversationDecision.FOLLOW_UP

        ):

            logger.info(
                "Follow-up detected."
            )

            context.planner_required = False

            return

        # ==========================================
        # Parameter Correction
        # ==========================================

        if (

            conversation.decision

            == ConversationDecision.PARAMETER_CORRECTION

        ):

            logger.info(
                "Parameter correction."
            )

            context.planner_required = True

            return

        # ==========================================
        # Intent Switch
        # ==========================================

        if (

            conversation.decision

            == ConversationDecision.INTENT_SWITCH

        ):

            logger.info(
                "Intent switch."
            )

            context.planner_required = True

            return

        context.planner_required = True