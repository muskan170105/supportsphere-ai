from pydantic import BaseModel


class SettingsResponse(BaseModel):

    model: str

    developer_mode: bool

    conversation_memory: bool

    analytics_tracking: bool

    retrieval_cache: bool

    guardrails: bool

    temperature: float

    max_tokens: int

    top_p: float


class SettingsUpdateRequest(BaseModel):

    model: str | None = None

    developer_mode: bool | None = None

    conversation_memory: bool | None = None

    analytics_tracking: bool | None = None

    retrieval_cache: bool | None = None

    guardrails: bool | None = None

    temperature: float | None = None

    max_tokens: int | None = None

    top_p: float | None = None