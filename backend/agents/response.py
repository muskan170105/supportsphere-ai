from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
)

from prompts.response_prompt import RESPONSE_PROMPT

from core.config import settings
from dev.dev_service import DevService


def response_agent(
    response_llm,
    user_query: str,
    planner_result,
    tool_result=None,
    retrieved_context="",
    chat_history=None,
):
    """
    Response Agent.

    DEV_MODE:
        Uses DevService.

    Production:
        Uses Gemini.
    """

    # =====================================================
    # Developer Mode
    # =====================================================

    if settings.DEV_MODE:

        return DevService.response(

            planner_result=planner_result,

            tool_result=tool_result,

            retrieved_context=retrieved_context,

        )

    # =====================================================
    # Production
    # =====================================================

    messages = [

        SystemMessage(

            content=RESPONSE_PROMPT.format(

                context=retrieved_context,

                tool_result=tool_result,

            )

        )

    ]

    if chat_history:

        messages.extend(
            chat_history
        )

    messages.append(

        HumanMessage(
            content=user_query
        )

    )

    response = response_llm.invoke(
        messages
    )

    return response.content