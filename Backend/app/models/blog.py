from typing import Optional
from sqlmodel import SQLModel, Field

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    summary: str
    content: str
    image: str
    date: str
    tags: str # Comma-separated
    author: str
