"""Database configuration and session management."""
from sqlmodel import SQLModel, create_engine, Session
from app.config import settings

DATABASE_URL = settings.sync_database_url
ASYNC_DATABASE_URL = settings.async_database_url

engine = create_engine(DATABASE_URL, echo=True)

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

async_engine = create_async_engine(ASYNC_DATABASE_URL, echo=True)

def init_db():
    """Initializes the database by creating all tables defined in SQLModel metadata."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Provides a transactional scope around a series of operations."""
    with Session(engine) as session:
        yield session

async def get_async_session():
    """Provides an async transactional scope."""
    async_session_maker = sessionmaker(
        async_engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session_maker() as session:
        yield session
