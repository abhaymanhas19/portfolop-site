from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship, Column, JSON

class ProjectCategory(str, Enum):
    AI_PLATFORM = "AI platform website"
    REALTIME_APP = "Realtime applicaion"
    CHATBOTS = "Chatbots"
    AI_AGENTS = "Ai agents system"
    OTHER = "Other"

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    summary: str
    description: str
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    backdrop: str
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    category: ProjectCategory = Field(default=ProjectCategory.OTHER)
    
    images: List["ProjectImage"] = Relationship(back_populates="project")

class ProjectImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_url: str
    project_id: Optional[int] = Field(default=None, foreign_key="project.id")
    
    project: Optional[Project] = Relationship(back_populates="images")
