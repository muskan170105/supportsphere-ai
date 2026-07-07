from datetime import datetime


class ConversationRepository:

    def __init__(self):

        self.conversations = {

            1: {
                "id": 1,
                "customer_id": 1,
                "name": "Rahul Sharma",
                "last_message": "Where is my order?",
                "status": "Active",
                "time": "2 min ago",
            },

            2: {
                "id": 2,
                "customer_id": 2,
                "name": "Priya Verma",
                "last_message": "Refund status?",
                "status": "Waiting",
                "time": "10 min ago",
            },

            3: {
                "id": 3,
                "customer_id": 3,
                "name": "Michael Lee",
                "last_message": "Payment failed",
                "status": "Resolved",
                "time": "25 min ago",
            },

        }

    # ======================================================
    # Queries
    # ======================================================

    def get_all(self):

        return list(
            self.conversations.values()
        )

    def get(self, conversation_id: int):

        return self.conversations.get(
            conversation_id
        )

    # ======================================================
    # Updates
    # ======================================================

    def update_status(
        self,
        conversation_id: int,
        status: str,
    ):

        conversation = self.get(
            conversation_id
        )

        if conversation:

            conversation["status"] = status

    def update_last_message(
        self,
        conversation_id: int,
        message: str,
    ):

        conversation = self.get(
            conversation_id
        )

        if conversation:

            conversation["last_message"] = message

    def update_time(
        self,
        conversation_id: int,
    ):

        conversation = self.get(
            conversation_id
        )

        if conversation:

            conversation["time"] = datetime.now().strftime(
                "%I:%M %p"
            )

    # ======================================================
    # Convenience
    # ======================================================

    def mark_waiting(
        self,
        conversation_id: int,
        message: str,
    ):

        self.update_last_message(
            conversation_id,
            message,
        )

        self.update_status(
            conversation_id,
            "Waiting",
        )

        self.update_time(
            conversation_id,
        )

    def mark_processing(
        self,
        conversation_id: int,
    ):

        self.update_status(
            conversation_id,
            "Processing",
        )

    def mark_active(
        self,
        conversation_id: int,
    ):

        self.update_status(
            conversation_id,
            "Active",
        )

    def mark_resolved(
        self,
        conversation_id: int,
    ):

        self.update_status(
            conversation_id,
            "Resolved",
        )


conversation_repository = ConversationRepository()