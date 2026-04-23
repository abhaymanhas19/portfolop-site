from typing import Optional
from sqlmodel import SQLModel, Field

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    summary: str
    description: str
    tags: str  # Comma-separated tags
    image: str
    backdrop: str
    demo: Optional[str] = None
    repo: Optional[str] = None
    category: str
