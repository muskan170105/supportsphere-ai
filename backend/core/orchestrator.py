import time

from services.settings_service import settings_service

from core.execution_logger import execution_logger
from core.logger import logger

from core.orchestration.context import PipelineContext

from core.orchestration.memory_stage import MemoryStage
from core.orchestration.planner_stage import PlannerStage
from core.orchestration.tool_stage import ToolStage
from core.orchestration.retriever_stage import RetrieverStage
from core.orchestration.response_stage import ResponseStage
from core.orchestration.finalizer import Finalizer
from core.orchestration.guardrail_stage import GuardrailStage


class ConversationOrchestrator:
    """
    Coordinates the complete SupportSphere AI pipeline.

    Each stage has exactly one responsibility.
    """

    def __init__(
        self,
        llm,
        embedding_model,
        tool_agent,
        session,
    ):

        self.session = session

        self.memory_stage = MemoryStage(
            session=session,
        )

        self.planner_stage = PlannerStage(
            llm=llm,
            session=session,
        )

        self.guardrail_stage = GuardrailStage(
            session=session,
        )

        self.tool_stage = ToolStage(
            tool_agent=tool_agent,
        )

        self.retriever_stage = RetrieverStage(
            embedding_model=embedding_model,
        )

        self.response_stage = ResponseStage(
            llm=llm,
            session=session,
        )

        self.finalizer = Finalizer(
            session=session,
        )

    def run(
        self,
        user_query: str,
    ):

        logger.info("=" * 80)

        logger.info(
            f"User Query : {user_query}"
        )

        execution_logger.clear()

        context = PipelineContext(

            user_query=user_query,

            start_time=time.perf_counter(),

            chat_history=self.session.history.get_history(),

        )

        # ==========================================
        # Memory Snapshot (Before)
        # ==========================================

        if settings_service.conversation_memory:

            mem = self.session.conversation_state.memory

            context.memory_before_dict = {

                "known_parameters": dict(
                    mem.parameters
                ),

                "missing_parameters": list(
                    mem.missing_parameters
                ),

                "current_intent": mem.current_intent,

                "current_tool": mem.current_tool,

            }

        else:

            context.memory_before_dict = {

                "known_parameters": {},

                "missing_parameters": [],

                "current_intent": None,

                "current_tool": None,

            }

        try:

            # ==========================================
            # Memory
            # ==========================================

            if settings_service.conversation_memory:

                logger.info(
                    "Conversation Memory : ENABLED"
                )

                self.memory_stage.execute(
                    context
                )

            else:

                logger.info(
                    "Conversation Memory : DISABLED"
                )

            # ==========================================
            # Planner
            # ==========================================

            self.planner_stage.execute(
                context
            )

            # ==========================================
            # Guardrail
            # ==========================================

            self.guardrail_stage.execute(
                context
            )

            # ==========================================
            # Tool
            # ==========================================

            self.tool_stage.execute(
                context
            )

            # ==========================================
            # Retriever
            # ==========================================

            self.retriever_stage.execute(
                context
            )

            # ==========================================
            # Response
            # ==========================================

            self.response_stage.execute(
                context
            )

            # ==========================================
            # Memory Snapshot (After)
            # ==========================================

            if settings_service.conversation_memory:

                mem_after = self.session.conversation_state.memory

                context.memory_after_dict = {

                    "known_parameters": dict(
                        mem_after.parameters
                    ),

                    "missing_parameters": list(
                        mem_after.missing_parameters
                    ),

                    "current_intent": mem_after.current_intent,

                    "current_tool": mem_after.current_tool,

                }

            else:

                context.memory_after_dict = {

                    "known_parameters": {},

                    "missing_parameters": [],

                    "current_intent": None,

                    "current_tool": None,

                }

            # ==========================================
            # Finalizer
            # ==========================================

            return self.finalizer.execute(
                context
            )

        except Exception:

            logger.exception(
                "Pipeline execution failed."
            )

            raise