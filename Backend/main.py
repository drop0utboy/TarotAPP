# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi.middleware.cors import CORSMiddleware

SQLALCHEMY_DATABASE_URL = "sqlite:///./tarot.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class ReadingORM(Base):
    __tablename__ = "readings"
    id        = Column(Integer, primary_key=True, index=True)
    question  = Column(String(255))
    spread    = Column(String(50))
    cards     = Column(Text)          # JSON 문자열(카드 3장 등)
    summary   = Column(Text)

Base.metadata.create_all(bind=engine)

class ReadingIn(BaseModel):
    question: str
    spread: str
    cards: list[str]
    summary: str

class ReadingOut(ReadingIn):
    id: int

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 프론트엔드 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],      # GET, POST, PUT, DELETE 등 모두 허용
    allow_headers=["*"],      # Authorization, Content-Type 등
)


@app.get("/api/readings", response_model=list[ReadingOut])
def list_readings():
    db = SessionLocal()
    readings = db.query(ReadingORM).all()
    return [ReadingOut(**r.__dict__) for r in readings]

@app.post("/api/readings", response_model=ReadingOut)
def save_reading(reading: ReadingIn):
    db = SessionLocal()
    orm = ReadingORM(**reading.dict(), cards=",".join(reading.cards))
    db.add(orm)
    db.commit()
    db.refresh(orm)
    return ReadingOut(**orm.__dict__)
