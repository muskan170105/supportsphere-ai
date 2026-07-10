from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
)

from prompts.planner_prompt import PLANNER_PROMPT
from schemas.planner_schema import PlannerOutput

from core.execution_logger import execution_logger

from core.config import settings
from dev.dev_service import DevService

def planner_agent(
    planner_llm,
    user_query: str,
    working_memory=None,
    chat_history: list | None = None,
) -> PlannerOutput:
    """
    Planner Agent.

    DEV_MODE:
        Uses DevService.

    Production:
        Uses Gemini.
    """

    # =====================================================
    # Developer Mode
    # =====================================================

    if settings.DEV_MODE:

        planner_result = DevService.planner(
            user_query
        )

        execution_logger.log(

            "Developer Planner",

            f"Intent : {planner_result.intent.value}",

        )

        return planner_result

    # =====================================================
    # Production
    # =====================================================

    messages = [

        SystemMessage(
            content=PLANNER_PROMPT
        )

    ]

    if (
        working_memory
        and working_memory.has_active_task()
    ):

        memory_prompt = f"""
Current Conversation Memory

Current Intent:
{working_memory.current_intent}

Current Tool:
{working_memory.current_tool}

Known Parameters:
{working_memory.parameters}

Missing Parameters:
{working_memory.missing_parameters}

Last Tool Result:
{working_memory.last_tool_result}

Last Retrieved Sources:
{working_memory.last_retrieved_sources}

Last AI Response:
{working_memory.last_answer}

Continue the current task whenever appropriate.

Never ask again for information that
already exists in memory.
"""

        messages.append(
            SystemMessage(
                content=memory_prompt
            )
        )

    if chat_history:

        messages.extend(
            chat_history
        )

    messages.append(

        HumanMessage(
            content=user_query
        )

    )

    structured_llm = (

        planner_llm.with_structured_output(

            PlannerOutput

        )

    )

    planner_result = structured_llm.invoke(
        messages
    )

    execution_logger.log(

        "Planner Agent",

        f"Intent : {planner_result.intent.value}",

    )

    return planner_result