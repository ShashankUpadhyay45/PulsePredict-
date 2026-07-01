from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from . import crud, utils, schemas

SECRET = "SUPER_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MIN = 60

def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user:
        return None
    if not utils.verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(data: dict, expires_minutes=ACCESS_TOKEN_EXPIRE_MIN):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)
