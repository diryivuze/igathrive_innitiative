from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
from schemas import schemas
from models import userModels
from utils.hashing import Hash
from utils.token import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=['Authentication']
)

@router.post('/register')
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(userModels.User).filter(
        userModels.User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = Hash.bcrypt(request.password)
    new_user = userModels.User(
        username=request.username,
        email=request.email,
        password=hashed_password,
        role="student"  # Default role for new registrations
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully", "user": new_user}

@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(userModels.User).filter(
        userModels.User.email == request.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not Hash.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Generate JWT token
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "username": user.username,
        "email": user.email
    }
