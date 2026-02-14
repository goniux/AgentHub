from sqlalchemy.orm import Session
from app.models.agent import Agent


def create_agent(db: Session, name: str, description: str, prompt: str):
    agent = Agent(
        name=name,
        description=description,
        prompt=prompt
    )
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent


def get_agents(db: Session):
    return db.query(Agent).all()
