from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional, List
from models.userModels import UserRole

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    role: UserRole
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class MentorResponse(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)

class MentorWithCourses(MentorResponse):
    courses: List['CourseResponse'] = []

class CourseResponse(BaseModel):
    id: int
    name: str
    description: str
    mentor: MentorResponse
    
    model_config = ConfigDict(from_attributes=True)