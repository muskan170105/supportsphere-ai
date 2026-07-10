from core.orchestration.context import (
    PipelineContext,
)


class ConfidenceService:
    """
    Computes an overall confidence score
    for the generated response.
    """

    def compute(
        self,
        context: PipelineContext,
    ):

        # =============================================
        # Business Tool Response
        # =============================================

        if context.tool_result is not None:

            context.confidence = 98.0

            context.confidence_level = "High"

            intent = (
                context.planner_result.intent.value
                if context.planner_result
                else ""
            )

            if intent == "ORDER_TRACKING":

                reason = (
                    "Verified using live order tracking data."
                )

            elif intent == "REFUND_REQUEST":

                reason = (
                    "Verified using the refund management system."
                )

            elif intent == "PASSWORD_RESET":

                reason = (
                    "Verified using the account management service."
                )

            elif intent == "PAYMENT_FAILURE":

                reason = (
                    "Verified using payment records."
                )

            else:

                reason = (
                    "Verified using a business tool."
                )

            context.confidence_reason = reason

            return

        # =============================================
        # Retrieval Response
        # =============================================

        if context.retrieved_sources:

            similarity = (
                context.average_similarity
                or 0.5
            )

            # Chroma returns distance:
            # lower = better

            confidence = max(
                50,
                100 - (similarity * 100),
            )

            confidence = round(
                confidence,
                1,
            )

            if confidence >= 90:

                level = "High"

            elif confidence >= 75:

                level = "Medium"

            else:

                level = "Low"

            context.confidence = confidence

            context.confidence_level = level

            document_count = len(
                context.retrieved_sources
            )

            if document_count == 1:

                reason = (
                    "Verified using one company knowledge document."
                )

            else:

                reason = (
                    f"Verified using {document_count} company knowledge documents."
                )

            context.confidence_reason = reason

            return

        # =============================================
        # General LLM Response
        # =============================================

        context.confidence = 65.0

        context.confidence_level = "Medium"

        context.confidence_reason = (
            "Generated using the AI assistant without company knowledge."
        )


confidence_service = ConfidenceService()