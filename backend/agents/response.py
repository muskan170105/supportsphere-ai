from prompts.response_prompt import RESPONSE_PROMPT

from core.execution_logger import execution_logger


def response_agent(
    llm,
    user_query: str,
    planner_result,
    retrieved_context: str | None,
    tool_result: dict | None,
    chat_history: str,
):
    """
    Response Agent

    Responsibilities
    ----------------
    - Generate the final customer response.
    - Ask for missing information when required.
    - Use retrieved knowledge.
    - Use business tool results.
    - Never make business decisions.
    """

    prompt = RESPONSE_PROMPT.format(
        chat_history=chat_history,
        question=user_query,
        intent=planner_result.intent,
        missing_parameters=planner_result.missing_parameters,
        retrieved_context=retrieved_context or "No retrieved context available.",
        tool_result=tool_result or "No tool was executed.",
    )

    response = llm.invoke(prompt)

    execution_logger.log(
        "Response Agent",
        "Generated final response"
    )

    return response.content