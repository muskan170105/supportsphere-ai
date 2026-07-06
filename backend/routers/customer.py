from fastapi import APIRouter, HTTPException

from schemas.customer_schema import CustomerResponse

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)

customers = {
    1: CustomerResponse(
        id=1,
        name="Rahul Sharma",
        email="rahul@example.com",
        phone="+91 9876543210",
        tier="Premium",
        orders=18,
        spent=42580,
        member_since="2023",
    ),
    2: CustomerResponse(
        id=2,
        name="Priya Verma",
        email="priya@example.com",
        phone="+91 9123456789",
        tier="Gold",
        orders=9,
        spent=18320,
        member_since="2024",
    ),
}


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int):
    if customer_id not in customers:
        raise HTTPException(status_code=404, detail="Customer not found")

    return customers[customer_id]