from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional
from models.userModels import UserRole

class UserBase(BaseModel):
    email: str
    username: str
    role: UserRole = UserRole.STUDENT
    
    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
    
    model_config = ConfigDict(from_attributes=True)

class MentorBase(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    
    model_config = ConfigDict(from_attributes=True)

class MentorCreate(MentorBase):
    password: str

class MentorUpdate(BaseModel):
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    password: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class CourseBase(BaseModel):
    name: str
    description: str
    mentor_id: int
    
    model_config = ConfigDict(from_attributes=True)

class CourseCreate(CourseBase):
    pass

class CourseUpdate(CourseBase):
    pass