from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.connection import get_db
from schemas import schemas, returnSchemas
from models.userModels import User, Mentor, UserRole
from passlib.context import CryptContext
from typing import List

router = APIRouter(
    prefix="/mentors",
    tags=["Mentors"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def check_admin(user: User):
    if user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can access this endpoint"
        )

@router.post("/", response_model=returnSchemas.MentorResponse)
def create_mentor(
    mentor: schemas.MentorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    # Verify admin access
    check_admin(current_user)
    
    # Check if mentor with email exists
    if db.query(Mentor).filter(Mentor.email == mentor.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(mentor.password)
    db_mentor = Mentor(
        firstname=mentor.firstname,
        lastname=mentor.lastname,
        email=mentor.email,
        phone=mentor.phone,
        hashed_password=hashed_password
    )
    db.add(db_mentor)
    db.commit()
    db.refresh(db_mentor)
    return db_mentor

@router.get("/", response_model=List[returnSchemas.MentorResponse])
def get_mentors(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    check_admin(current_user)
    mentors = db.query(Mentor).offset(skip).limit(limit).all()
    return mentors

@router.get("/{mentor_id}", response_model=returnSchemas.MentorResponse)
def get_mentor(
    mentor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    check_admin(current_user)
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return mentor

@router.put("/{mentor_id}", response_model=returnSchemas.MentorResponse)
def update_mentor(
    mentor_id: int,
    mentor_update: schemas.MentorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    check_admin(current_user)
    db_mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    if not db_mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    
    update_data = mentor_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    for key, value in update_data.items():
        setattr(db_mentor, key, value)
    
    db.commit()
    db.refresh(db_mentor)
    return db_mentor

@router.delete("/{mentor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mentor(
    mentor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_db)
):
    check_admin(current_user)
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    
    db.delete(mentor)
    db.commit()
    return {"ok": True} 