import re

from langchain_core.messages import HumanMessage


def resolve_context(user_query: str, chat_history: list) -> str:
    """
    Resolve references in the user's query using
    previous conversation history.

    Version 1:
    - Resolve references to order IDs.
    """

    query = user_query.lower()

    reference_words = [
        "it",
        "that",
        "this",
        "same order",
        "previous order",
    ]

    # If the query doesn't contain any reference,
    # return it unchanged.
    if not any(word in query for word in reference_words):
        return user_query

    # Search previous user messages in reverse order
    for message in reversed(chat_history):

        if not isinstance(message, HumanMessage):
            continue

        match = re.search(r"\b\d{5}\b", message.content)

        if match:
            order_id = match.group()

            return (
                f"{user_query}\n\n"
                f"(Reference Order ID: {order_id})"
            )

    return user_query