import re

from schemas.planner_schema import (
    PlannerOutput,
    Intent,
    Tool,
)


class DevService:
    """
    Central developer service.

    Simulates the LLM while keeping the
    remaining pipeline completely real.
    """

    # =====================================================
    # Planner
    # =====================================================

    @staticmethod
    def planner(user_query: str):

        query = user_query.lower()

        # -----------------------------
        # Order Tracking
        # -----------------------------

        if "track" in query:

            match = re.search(r"\d+", query)

            order_id = (
                match.group()
                if match
                else None
            )

            return PlannerOutput(
                intent=Intent.ORDER_TRACKING,
                tool=Tool.ORDER_TRACKING,
                need_rag=False,
                parameters={
                    "order_id": order_id
                } if order_id else {},
                missing_parameters=[]
                if order_id
                else ["order_id"],
            )

        # -----------------------------
        # Refund
        # -----------------------------

        if "refund" in query:

            return PlannerOutput(
                intent=Intent.REFUND_REQUEST,
                tool=Tool.REFUND_REQUEST,
                need_rag=False,
                parameters={},
                missing_parameters=["order_id"],
            )

        # -----------------------------
        # Password
        # -----------------------------

        if "password" in query:

            return PlannerOutput(
                intent=Intent.PASSWORD_RESET,
                tool=Tool.PASSWORD_RESET,
                need_rag=False,
                parameters={},
                missing_parameters=["email"],
            )

        # -----------------------------
        # Payment
        # -----------------------------

        if "payment" in query:

            return PlannerOutput(
                intent=Intent.PAYMENT_FAILURE,
                tool=Tool.PAYMENT_FAILURE,
                need_rag=False,
                parameters={},
                missing_parameters=["order_id"],
            )

        # -----------------------------
        # Everything else
        # -----------------------------

        return PlannerOutput(
            intent=Intent.GENERAL_QUERY,
            tool=None,
            need_rag=True,
            parameters={},
            missing_parameters=[],
        )

    # =====================================================
    # Response
    # =====================================================

    @staticmethod
    def response(
        planner_result,
        tool_result,
        retrieved_context,
    ):

        # -----------------------------
        # Tool Results
        # -----------------------------

        if tool_result:

            if not tool_result.get("success", False):
                return tool_result.get(
                    "message",
                    "Sorry, I couldn't complete your request."
                )

            intent = (
                planner_result.intent.value
                if planner_result
                else ""
            )

            # -------------------------
            # Order Tracking
            # -------------------------

            if intent == "ORDER_TRACKING":

                order_id = tool_result.get("order_id", "Unknown")
                status = tool_result.get("status", "Unknown")
                delivery = tool_result.get("estimated_delivery", "Unknown")

                return (
                    f"✅ I checked your order **#{order_id}**.\n\n"
                    f"Current Status: **{status}**\n"
                    f"Estimated Delivery: **{delivery}**\n\n"
                    "Let me know if you'd also like help with a refund, return, or delivery issue."
                )

            # -------------------------
            # Refund
            # -------------------------

            if intent == "REFUND_REQUEST":

                return (
                    "✅ Your refund request has been submitted successfully.\n\n"
                    "We'll review the request and keep you updated on its progress."
                )

            # -------------------------
            # Password
            # -------------------------

            if intent == "PASSWORD_RESET":

                return (
                    "✅ Your password reset request has been initiated.\n\n"
                    "Please check your registered email for the password reset instructions."
                )

            # -------------------------
            # Payment
            # -------------------------

            if intent == "PAYMENT_FAILURE":

                return (
                    "I checked your payment request.\n\n"
                    "If the payment failed, you can safely try again. "
                    "If the amount has already been deducted, I'll help you investigate it."
                )

            return "Your request was completed successfully."

        # -----------------------------
        # Knowledge Base
        # -----------------------------

        if retrieved_context:

            return (
                "Here's what I found in our knowledge base:\n\n"
                f"{retrieved_context}"
            )

        # -----------------------------
        # Default
        # -----------------------------

        return (
            "I'm here to help. Could you please provide a little more information about your request?"
        )