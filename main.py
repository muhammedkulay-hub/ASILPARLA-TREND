"""
AsilParla FastAPI Backend - Minimal Setup
"""
import os
from fastapi import FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env.development
load_dotenv(".env.development")

# Database URL from environment or fallback
DB_URL = os.getenv(
    "DB_URL",
    "postgresql+psycopg2://postgres:525458@localhost:5432/postgres"
)

# Create SQLAlchemy engine
engine = create_engine(DB_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Initialize FastAPI app
app = FastAPI(title="AsilParla API", version="1.17.02")


@app.get("/")
async def root():
    """Root endpoint - API status check"""
    return {"status": "AsilParla API aktif"}


@app.get("/db-check")
async def db_check():
    """Database connection check endpoint"""
    try:
        # Open and close a database connection
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"database": "connected"}
    except Exception as e:
        return {"database": f"error: {str(e)}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

