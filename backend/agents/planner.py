from langchain_core.messages import HumanMessage, SystemMessage

from prompts.planner_prompt import PLANNER_PROMPT
from schemas.planner_schema import PlannerOutput

from core.execution_logger import execution_logger


def planner_agent(
    planner_llm,
    user_query: str,
    chat_history: list | None = None,
) -> PlannerOutput:
    """
    Planner Agent

    Responsibilities:
    - Understand the user's request.
    - Identify the user's intent.
    - Decide whether RAG is required.
    - Decide whether a business tool should be executed.
    - Extract the required parameters.
    """

    messages = [
        SystemMessage(content=PLANNER_PROMPT)
    ]

    if chat_history:
        messages.extend(chat_history)

    messages.append(
        HumanMessage(content=user_query)
    )

    structured_llm = planner_llm.with_structured_output(
        PlannerOutput
    )

    planner_result = structured_llm.invoke(messages)

    # Log Planner Execution
    execution_logger.log(
        "Planner Agent",
        f"Intent: {planner_result.intent}"
    )

    return planner_result