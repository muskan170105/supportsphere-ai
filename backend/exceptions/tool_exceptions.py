class ToolException(Exception):
    """
    Base exception for all tool errors.
    """
    pass


class ToolNotFoundException(ToolException):
    """
    Raised when the planner selects an unknown tool.
    """

    def __init__(self, tool_name: str):
        super().__init__(
            f"Unknown tool: {tool_name}"
        )


class ToolExecutionException(ToolException):
    """
    Raised when a tool fails during execution.
    """

    def __init__(self, tool_name: str):
        super().__init__(
            f"Failed to execute tool: {tool_name}"
        )