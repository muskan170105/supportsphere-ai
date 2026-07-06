class CustomerRepository:

    def get_customer(self, customer_id):

        customers = {
            1: {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1 555 123 4567",
                "tier": "Premium",
                "total_orders": 14,
            },
            2: {
                "id": 2,
                "name": "Sarah Smith",
                "email": "sarah@example.com",
                "phone": "+1 555 654 9876",
                "tier": "Gold",
                "total_orders": 8,
            },
            3: {
                "id": 3,
                "name": "Michael Lee",
                "email": "michael@example.com",
                "phone": "+1 555 888 7777",
                "tier": "Silver",
                "total_orders": 3,
            },
        }

        return customers.get(customer_id)
        

customer_repository = CustomerRepository()