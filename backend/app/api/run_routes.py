from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud.agent import get_agents
from app.crud.agent_run import create_run, get_runs
from app.services.agent_runner import run_agent_logic
from app.models.agent import Agent

router = APIRouter()


@router.post("/agents/{agent_id}/run")
def run_agent(agent_id: int, input_text: str, db: Session = Depends(get_db)):
    agent = db.query(Agent).filter(Agent.id == agent_id).first()

    if not agent:
        return {"error": "Agent not found"}

    output = run_agent_logic(agent.prompt, input_text)

    run = create_run(db, agent_id, input_text, output)

    return run


@router.get("/runs")
def list_runs(db: Session = Depends(get_db)):
    return get_runs(db)
