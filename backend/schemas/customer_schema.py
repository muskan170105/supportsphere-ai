from pydantic import BaseModel


class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    tier: str
    orders: int
    spent: int
    member_since: str