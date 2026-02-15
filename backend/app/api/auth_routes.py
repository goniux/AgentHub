from fastapi import APIRouter, HTTPException
from app.auth import create_token
from app.database import SessionLocal
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(email: str, name: str):
    db = SessionLocal()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(email=email, name=name)
        db.add(user)
        db.commit()

    token = create_token(email)

    return {"token": token}
