from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import pandas as pd
import io

from .database import Base, engine, SessionLocal
from . import schemas, crud, auth, models, ml

app = FastAPI()

# create tables
Base.metadata.create_all(bind=engine)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://pulse-predict-73lvc05f2-shashank19.vercel.app",
        "https://pulse-predict-shashank19.vercel.app",
        "https://pulse-predict.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/auth/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_username(db, user.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = crud.create_user(db, user)
    return {"message": "User created", "username": new_user.username}

@app.post("/auth/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    valid = auth.authenticate_user(db, user.username, user.password)
    if not valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/auth/token", response_model=schemas.Token)
def login_for_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/predict", response_model=schemas.PredictResponse)
def post_predict(request: schemas.PredictRequest, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = ml.predict_single(request.input)
    crud.create_prediction_history(
        db,
        user_id=current_user.id,
        input_text=request.input,
        result_text=res["prediction"],
        numeric_result=res["numeric"]
    )
    return res


@app.get("/history", response_model=schemas.HistoryResponse)
def get_history(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    items = crud.get_prediction_history(db, user_id=current_user.id)
    return {"items": items}

@app.post("/upload_csv")
def upload_csv(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    try:
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents))
        if df.empty:
            raise HTTPException(status_code=400, detail="CSV file is empty")
        
        # Look for typical ticker column names
        target_col = None
        for col in df.columns:
            if col.lower() in ['ticker', 'symbol', 'input']:
                target_col = col
                break
        if target_col is None:
            target_col = df.columns[0]
            
        results = []
        for _, row in df.iterrows():
            inp = str(row[target_col]).strip()
            res = ml.predict_single(inp)
            db_item = crud.create_prediction_history(
                db,
                user_id=current_user.id,
                input_text=inp,
                result_text=res["prediction"],
                numeric_result=res["numeric"]
            )
            results.append({
                "id": db_item.id,
                "input_text": inp,
                "result_text": res["prediction"],
                "numeric_result": res["numeric"],
                "created_at": db_item.created_at
            })
        return {"items": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process CSV file: {str(e)}")

@app.get("/")
def root():
    return {"message": "Auth and Stock Prediction system working!"}

