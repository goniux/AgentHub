from pydantic import BaseModel
from datetime import datetime


class AgentCreate(BaseModel):
    name: str
    description: str | None = None
    prompt: str


class AgentResponse(BaseModel):
    id: int
    name: str
    description: str | None
    prompt: str
    created_at: datetime

    class Config:
        from_attributes = True
