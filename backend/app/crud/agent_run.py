from sqlalchemy.orm import Session
from app.models.agent_run import AgentRun


def create_run(db: Session, agent_id: int, input_text: str, output_text: str):
    run = AgentRun(
        agent_id=agent_id,
        input_text=input_text,
        output_text=output_text
    )
    db.add(run)
    db.commit()
    db.refresh(run)
    return run


def get_runs(db: Session):
    return db.query(AgentRun).order_by(AgentRun.created_at.desc()).all()
