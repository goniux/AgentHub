from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.agent import AgentCreate, AgentResponse
from app.crud.agent import create_agent, get_agents

router = APIRouter()


@router.post("/agents", response_model=AgentResponse)
def create_agent_endpoint(agent: AgentCreate, db: Session = Depends(get_db)):
    return create_agent(db, agent.name, agent.description, agent.prompt)


@router.get("/agents")
def list_agents(db: Session = Depends(get_db)):
    return get_agents(db)
