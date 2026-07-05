from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class Intent(str, Enum):
    """
    Supported customer intents.
    """

    ORDER_TRACKING = "ORDER_TRACKING"
    REFUND_REQUEST = "REFUND_REQUEST"
    PAYMENT_FAILURE = "PAYMENT_FAILURE"
    PASSWORD_RESET = "PASSWORD_RESET"
    GENERAL_INFORMATION = "GENERAL_INFORMATION"


class Tool(str, Enum):
    """
    Supported business tools.
    """

    ORDER_TRACKING = "ORDER_TRACKING"
    REFUND_REQUEST = "REFUND_REQUEST"
    PAYMENT_FAILURE = "PAYMENT_FAILURE"
    PASSWORD_RESET = "PASSWORD_RESET"


class PlannerOutput(BaseModel):
    """
    Structured output produced by the Planner Agent.
    """

    intent: Intent

    tool: Optional[Tool] = None

    need_rag: bool

    parameters: dict = Field(default_factory=dict)

    missing_parameters: list[str] = Field(default_factory=list)