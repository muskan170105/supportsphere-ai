from agents.response import response_agent

from core.logger import logger
from core.execution_logger import execution_logger

from core.orchestration.context import PipelineContext


class ResponseStage:
    """
    Generates the final AI response.

    Handles:
    - Normal LLM response generation
    - Graceful fallback when LLM is unavailable
    """


    def __init__(
        self,
        llm,
        session,
    ):
        self.llm = llm
        self.session = session


    def execute(
        self,
        context: PipelineContext,
    ):
        """
        Generate the AI response.
        """

        if context.planner_result is None:
            raise ValueError(
                "Planner result is missing."
            )


        logger.info(
            "Running Response Agent..."
        )


        try:

            context.answer = response_agent(
                llm=self.llm,
                user_query=context.user_query,
                planner_result=context.planner_result,
                retrieved_context=context.retrieved_context,
                tool_result=context.tool_result,
                chat_history=self.session.history.format_history(),
            )


            execution_logger.log(
                "Response Agent",
                "Generated final AI response"
            )


            logger.info(
                "Response generated."
            )


        except Exception as e:

            logger.error(
                f"LLM Response failed: {str(e)}"
            )


            # ---------------------------------------
            # Temporary fallback for UI testing
            # ---------------------------------------

            intent = context.planner_result.intent.value


            if intent == "ORDER_TRACKING":

                context.answer = (
                    "Your order #12345 is currently out for delivery. "
                    "It is expected to arrive tomorrow."
                )


            elif intent == "REFUND_REQUEST":

                context.answer = (
                    "Your refund request has been received. "
                    "The refund will be processed within 5-7 business days."
                )


            elif intent == "PAYMENT_FAILURE":

                context.answer = (
                    "We noticed a payment issue. "
                    "Please retry the payment or use another payment method."
                )


            elif intent == "PASSWORD_RESET":

                context.answer = (
                    "You can reset your password using the "
                    "Forgot Password option on the login page."
                )


            else:

                context.answer = (
                    "Thank you for contacting SupportSphere AI. "
                    "How can I assist you today?"
                )


            execution_logger.log(
                "Response Agent",
                "Fallback response generated due to LLM unavailability"
            )


            logger.info(
                "Fallback response generated."
            )