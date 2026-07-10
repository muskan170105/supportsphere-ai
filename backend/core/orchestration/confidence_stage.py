from services.confidence_service import (
    confidence_service,
)

from core.logger import logger

from core.orchestration.context import (
    PipelineContext,
)


class ConfidenceStage:
    """
    Computes the confidence score for the current request.

    This stage executes after retrieval/tool execution and
    before the Response Agent.
    """

    def execute(
        self,
        context: PipelineContext,
    ):

        logger.info(
            "Running Confidence Engine..."
        )

        confidence_service.compute(
            context
        )

        logger.info(

            f"Confidence: "
            f"{context.confidence}% "
            f"({context.confidence_level})"

        )