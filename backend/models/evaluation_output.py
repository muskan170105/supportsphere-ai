from pydantic import BaseModel, Field


class EvaluationOutput(BaseModel):
    """
    Output returned by the Evaluation Agent.
    """

    passed: bool = Field(
        description="Whether the response passed evaluation."
    )

    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Confidence score."
    )

    feedback: str = Field(
        description="Reason for the evaluation."
    )