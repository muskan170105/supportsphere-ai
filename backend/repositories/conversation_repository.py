class ConversationRepository:

    def get_all(self):

        return [
            {
                "id": 1,
                "name": "John Doe",
                "last_message": "Where is my order?",
                "status": "Active",
                "time": "2 min ago",
            },
            {
                "id": 2,
                "name": "Sarah Smith",
                "last_message": "Refund status?",
                "status": "Waiting",
                "time": "10 min ago",
            },
            {
                "id": 3,
                "name": "Michael Lee",
                "last_message": "Payment failed",
                "status": "Resolved",
                "time": "25 min ago",
            },
        ]


conversation_repository = ConversationRepository()