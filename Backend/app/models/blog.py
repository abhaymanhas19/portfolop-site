from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship, Column, JSON


class BlogsCategory(str, Enum):
    BACKEND = "Backend"
    AI_ML = "Ai/ml"
    CLOUD_DEVOPS = "Cloud & devops"
    PROBLEM_SOLVING = "problemsolving"

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    category: str
    summary: Optional[str] = Field(default=None)
    content: Optional[str] = Field(default=None)
    date: Optional[str] = Field(default=None)
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    images: List["BlogImage"] = Relationship(back_populates="blog")

class BlogImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_url: str
    blog_id: Optional[int] = Field(default=None, foreign_key="blog.id")

    blog: Optional[Blog] = Relationship(back_populates="images")
