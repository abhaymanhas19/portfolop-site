from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    summary: str
    content: str
    image: str
    date: str
    tags: str
    author: str

    images: List["BlogImage"] = Relationship(back_populates="blog")

class BlogImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_url: str
    blog_id: Optional[int] = Field(default=None, foreign_key="blog.id")

    blog: Optional[Blog] = Relationship(back_populates="images")
