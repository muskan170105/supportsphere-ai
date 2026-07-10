import time
from types import SimpleNamespace

from services.settings_service import settings_service

from core.execution_logger import execution_logger
from core.memory.conversation_summary import ConversationSummary
from core.orchestration.context import PipelineContext


class Finalizer:

    def __init__(
        self,
        session,
    ):
        self.session = session

    def execute(
        self,
        context: PipelineContext,
    ):

        state = self.session.conversation_state

        # ==================================================
        # Conversation Memory
        # ==================================================

        if settings_service.conversation_memory:

            self.session.history.add_user_message(
                context.user_query
            )

            self.session.history.add_ai_message(
                context.answer
            )

            state.remember_answer(
                context.answer
            )

            state.remember_tool_result(
                context.tool_result
            )

            state.remember_sources(
                context.retrieved_sources
            )

            summary = ConversationSummary.build(
                state.memory
            )

            state.update_summary(
                summary
            )

        # ==================================================
        # Timeline
        # ==================================================

        self.session.set_timeline(
            execution_logger.get_execution_steps()
        )

        latency = round(
            time.perf_counter()
            - context.start_time,
            3,
        )

        planner_data = {

            "intent": (

                context.planner_result.intent.value

                if context.planner_result

                else state.memory.current_intent

            ),

            "need_rag": (

                context.planner_result.need_rag

                if context.planner_result

                else False

            ),

            "tool": (

                context.planner_result.tool.value

                if (
                    context.planner_result
                    and context.planner_result.tool
                )

                else state.memory.current_tool

            ),

        }

        retriever_data = {

            "executed":

                len(context.retrieved_sources) > 0,

            "retrieved_documents":

                len(context.retrieved_sources),

            "average_similarity":

                getattr(
                    context,
                    "average_similarity",
                    None,
                ),

            "sources":

                context.retrieved_sources,

        }

        tool_data = {

            "executed":

                context.tool_result is not None,

            "tool_name":

                state.memory.current_tool,

            "result":

                context.tool_result,

        }

        response_data = {

            "latency": latency,

            "confidence": 98.0,

            "confidence_level": "High",

            "answer_length": len(
                context.answer
            ),

        }

        guardrail_data = {

            "decision":
                context.guardrail_decision,

            "confirmation_required":
                context.confirmation_required,

            "confirmation_received":
                context.confirmation_received,

        }

        # ==================================================
        # Enterprise Execution Logger
        # ==================================================

        execution_logger.set_planner(
            planner_data
        )

        execution_logger.set_retriever(
            retriever_data
        )

        execution_logger.set_tool(
            tool_data
        )

        execution_logger.set_response(
            response_data
        )

        execution_logger.set_guardrail(
            guardrail_data
        )

        execution_logger.set_memory_before(
            context.memory_before_dict
        )

        execution_logger.set_memory_after(
            context.memory_after_dict
        )

        print("\n========== EXECUTION LOGGER ==========")
        print(execution_logger.export())
        print("======================================\n")

        result = {

            "response": context.answer,

            "confidence": 98.0,

            "confidence_level": "High",

            "confidence_reason": "Generated using conversation memory, planner decision, business tools and retrieved knowledge.",

            "planner": planner_data,

            "retriever": retriever_data,

            "tool": tool_data,

            "response_execution": response_data,

            "guardrail": guardrail_data,

            "memory_before": context.memory_before_dict,

            "memory_after": context.memory_after_dict,

            "timeline": execution_logger.get_execution_steps(),

            "sources": context.retrieved_sources,

            "execution": execution_logger.export(),

        }

        return SimpleNamespace(

            **{

                key: (

                    SimpleNamespace(**value)

                    if isinstance(value, dict)

                    else value

                )

                for key, value in result.items()

            }

        )