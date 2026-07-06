from fastapi import APIRouter

from repositories.conversation_repository import conversation_repository
from repositories.customer_repository import customer_repository

from schemas.conversation_schema import (
    Conversation,
    Customer,
)

router = APIRouter(tags=["Conversations"])


@router.get(
    "/conversations",
    response_model=list[Conversation],
)
def get_conversations():

    return conversation_repository.get_all()


@router.get(
    "/customers/{customer_id}",
    response_model=Customer,
)
def get_customer(customer_id: int):

    return customer_repository.get_customer(
        customer_id
    )