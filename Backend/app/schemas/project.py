"""Pydantic schemas for Project and ProjectImage models."""
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from app.models.project import ProjectCategory

class ProjectImageBase(BaseModel):
    image_url: str
    project_id: Optional[int] = None

class ProjectImageCreate(ProjectImageBase):
    pass

class ProjectImageResponse(ProjectImageBase):
    id: int

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    slug: str
    title: str
    summary: str
    description: str
    tags: List[str] = []
    backdrop: str
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    category: ProjectCategory = ProjectCategory.OTHER

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    summary: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    backdrop: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    category: Optional[ProjectCategory] = None

class ProjectResponse(ProjectBase):
    id: int
    images: List[ProjectImageResponse] = []

    class Config:
        from_attributes = True

class ProjectListResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True
