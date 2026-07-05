from prompts.evaluation_prompt import EVALUATION_PROMPT


def evaluation_agent(
    llm,
    user_query: str,
    planner_result,
    retrieved_context,
    tool_result,
    final_response,
):
    """
    Evaluation Agent

    Responsibilities
    ----------------
    Evaluate the quality of the generated response.
    """

    prompt = EVALUATION_PROMPT.format(
        question=user_query,
        intent=planner_result.intent,
        retrieved_context=retrieved_context,
        tool_result=tool_result,
        response=final_response,
    )

    result = llm.invoke(prompt)

    return result.content