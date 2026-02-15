from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.agent import AgentCreate, AgentResponse
from app.crud.agent import create_agent, get_agents
from app.auth import verify_token

router = APIRouter()


@router.post("/agents", response_model=AgentResponse)
def create_agent_endpoint(
    agent: AgentCreate,
    db: Session = Depends(get_db),
    authorization: str = Header(None)
):
    # Check Authorization header
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    # Extract token
    token = authorization.replace("Bearer ", "")
    email = verify_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Create agent
    return create_agent(db, agent.name, agent.description, agent.prompt)


@router.get("/agents")
def list_agents(db: Session = Depends(get_db)):
    return get_agents(db)
