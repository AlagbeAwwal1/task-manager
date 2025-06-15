from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String)

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str

class TaskUpdate(BaseModel):
    title: str
    description: str
    status: str

engine = create_engine("sqlite:///tasks.db")
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine)

# API Endpoints
@app.get("/api/tasks")
async def get_tasks():
    db = SessionLocal()
    tasks = db.query(Task).all()
    db.close()
    return tasks

@app.post("/api/tasks")
async def create_task(task: TaskCreate):
    db = SessionLocal()
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    db.close()
    return db_task

@app.put("/api/tasks/{id}")
async def update_task(id: int, task: TaskUpdate):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == id).first()
    if not db_task:
        db.close()
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.dict().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    db.close()
    return db_task

@app.delete("/api/tasks/{id}")
async def delete_task(id: int):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == id).first()
    if not db_task:
        db.close()
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    db.close()
    return {"message": "Task deleted"}