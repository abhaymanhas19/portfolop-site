from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship, Column, JSON

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    summary: str
    content: str
    date: str
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    images: List["BlogImage"] = Relationship(back_populates="blog")

class BlogImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_url: str
    blog_id: Optional[int] = Field(default=None, foreign_key="blog.id")

    blog: Optional[Blog] = Relationship(back_populates="images")
