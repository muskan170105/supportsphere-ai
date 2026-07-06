import re


def extract_parameter(parameter_name: str, text: str):
    """
    Extract the required parameter from the user's message.

    Args:
        parameter_name: Name of the parameter to extract.
        text: User's message.

    Returns:
        Extracted value if found, otherwise the original text.
    """

    # ---------------------------------
    # Order ID
    # ---------------------------------
    if parameter_name == "order_id":

        match = re.search(r"\b\d{5}\b", text)

        if match:
            return match.group()

    # ---------------------------------
    # Email
    # ---------------------------------
    if parameter_name == "email":

        match = re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )

        if match:
            return match.group()

    # ---------------------------------
    # Default
    # ---------------------------------
    return text.strip()