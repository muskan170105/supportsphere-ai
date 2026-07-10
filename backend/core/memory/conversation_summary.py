class ConversationSummary:
    """
    Builds a compact summary of the current
    conversation from Working Memory.

    This summary will later be passed to the
    Planner Agent instead of the entire chat
    history when conversations become long.
    """

    @staticmethod
    def build(memory) -> str:

        sections = []

        if memory.current_intent:

            sections.append(
                f"Current Intent: {memory.current_intent}"
            )

        if memory.current_tool:

            sections.append(
                f"Current Tool: {memory.current_tool}"
            )

        if memory.parameters:

            parameters = "\n".join(

                f"- {key}: {value}"

                for key, value in memory.parameters.items()

            )

            sections.append(

                "Known Parameters:\n"

                f"{parameters}"

            )

        if memory.missing_parameters:

            missing = ", ".join(

                memory.missing_parameters

            )

            sections.append(

                f"Missing Parameters: {missing}"

            )

        if memory.last_tool_result:

            sections.append(

                f"Last Tool Result: {memory.last_tool_result}"

            )

        if memory.last_retrieved_sources:

            sources = ", ".join(

                memory.last_retrieved_sources

            )

            sections.append(

                f"Knowledge Sources: {sources}"

            )

        if memory.last_answer:

            sections.append(

                f"Last AI Response: {memory.last_answer}"

            )

        return "\n\n".join(sections)