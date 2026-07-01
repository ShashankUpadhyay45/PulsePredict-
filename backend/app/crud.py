from sqlalchemy.orm import Session
from . import models, schemas, utils

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = utils.hash_password(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_prediction_history(db: Session, user_id: int, input_text: str, result_text: str, numeric_result: float = None):
    db_history = models.PredictionHistory(
        user_id=user_id,
        input_text=input_text,
        result_text=result_text,
        numeric_result=numeric_result
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history

def get_prediction_history(db: Session, user_id: int):
    return db.query(models.PredictionHistory).filter(models.PredictionHistory.user_id == user_id).order_by(models.PredictionHistory.created_at.desc()).all()

