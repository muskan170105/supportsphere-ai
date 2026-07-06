from pydantic import BaseModel


class Conversation(BaseModel):
    id: int
    name: str
    last_message: str
    status: str
    time: str


class Customer(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    tier: str
    total_orders: int