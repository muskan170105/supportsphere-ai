from pydantic import BaseModel


class TimelineStep(BaseModel):
    agent: str
    status: str
    description: str