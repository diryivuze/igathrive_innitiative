from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine
import models.userModels as models
from Endpoints import auth, courses, mentors

# Create the FastAPI app
app = FastAPI()

# Drop all tables and recreate them
models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite's default port
    "http://localhost:3000",  # React's default port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(mentors.router)

@app.get("/")
def root():
    return {"message": "Welcome to the API"}

