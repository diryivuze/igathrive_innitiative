from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from db.database import Base
import enum

class UserRole(str, enum.Enum):
    STUDENT = "student"
    MENTOR = "mentor"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    username = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    role = Column(SQLAlchemyEnum(UserRole), default=UserRole.STUDENT)
    is_active = Column(Boolean, default=True)

class Mentor(Base):
    __tablename__ = "mentors"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(255))
    lastname = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)
    courses = relationship("Course", back_populates="mentor")

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(1000))
    mentor_id = Column(Integer, ForeignKey("mentors.id"))
    mentor = relationship("Mentor", back_populates="courses")



  