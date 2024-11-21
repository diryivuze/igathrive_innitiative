from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.orm import Session
from . import database

def get_db() -> Generator[Session, None, None]:
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]