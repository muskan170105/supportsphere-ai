class CustomerRepository:

    def get_customer(self, customer_id):

        customers = {

            1: {
                "id": 1,
                "name": "Rahul Sharma",
                "email": "rahul@example.com",
                "phone": "+91 9876543210",
                "tier": "Premium",
                "orders": 18,
                "spent": 42580,
                "member_since": "2023",
            },

            2: {
                "id": 2,
                "name": "Priya Verma",
                "email": "priya@example.com",
                "phone": "+91 9123456789",
                "tier": "Gold",
                "orders": 9,
                "spent": 18320,
                "member_since": "2024",
            },

            3: {
                "id": 3,
                "name": "Michael Lee",
                "email": "michael@example.com",
                "phone": "+91 9988776655",
                "tier": "Silver",
                "orders": 3,
                "spent": 5400,
                "member_since": "2025",
            },

        }

        return customers.get(customer_id)


customer_repository = CustomerRepository()