from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class PredictRequest(BaseModel):
    input: str

class StockMeta(BaseModel):
    open: float
    high: float
    low: float
    volume: int
    currency: str

class HistoricalPrice(BaseModel):
    date: str
    close: float

class PredictResponse(BaseModel):
    prediction: str
    numeric: Optional[float] = None
    latest_data: Optional[StockMeta] = None
    historical: Optional[List[HistoricalPrice]] = None


class HistoryItem(BaseModel):
    id: int
    input_text: str
    result_text: str
    numeric_result: Optional[float]
    created_at: datetime

    class Config:
        orm_mode = True

class HistoryResponse(BaseModel):
    items: List[HistoryItem]

