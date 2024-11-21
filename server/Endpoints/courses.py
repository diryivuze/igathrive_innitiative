from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.connection import get_db
from schemas import schemas, returnSchemas
from models.userModels import User, Course, UserRole
from typing import List

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

@router.post("/", response_model=returnSchemas.CourseResponse)
def create_course(
    course: schemas.CourseCreate,
    db: Session = Depends(get_db)
):
    # Verify mentor exists and is actually a mentor
    mentor = db.query(User).filter(User.id == course.mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    if mentor.role != UserRole.MENTOR:
        raise HTTPException(status_code=400, detail="Specified user is not a mentor")

    db_course = Course(
        name=course.name,
        description=course.description,
        mentor_id=course.mentor_id
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/", response_model=List[returnSchemas.CourseResponse])
def read_courses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    courses = db.query(Course).offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=returnSchemas.CourseResponse)
def read_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.put("/{course_id}", response_model=returnSchemas.CourseResponse)
def update_course(
    course_id: int,
    course: schemas.CourseUpdate,
    db: Session = Depends(get_db)
):
    # Verify mentor exists and is actually a mentor
    mentor = db.query(User).filter(User.id == course.mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    if mentor.role != UserRole.MENTOR:
        raise HTTPException(status_code=400, detail="Specified user is not a mentor")

    db_course = db.query(Course).filter(Course.id == course_id).first()
    if db_course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    for key, value in course.dict().items():
        setattr(db_course, key, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if db_course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(db_course)
    db.commit()
    return {"ok": True}