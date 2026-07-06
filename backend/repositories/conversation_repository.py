class ConversationRepository:

    def get_all(self):

        return [
            {
                "id": 1,
                "customer_id": 1,
                "name": "Rahul Sharma",
                "last_message": "Where is my order?",
                "status": "Active",
                "time": "2 min ago",
            },
            {
                "id": 2,
                "customer_id": 2,
                "name": "Priya Verma",
                "last_message": "Refund status?",
                "status": "Waiting",
                "time": "10 min ago",
            },
            {
                "id": 3,
                "customer_id": 1,
                "name": "Rahul Sharma",
                "last_message": "Payment failed",
                "status": "Resolved",
                "time": "25 min ago",
            },
        ]


conversation_repository = ConversationRepository()