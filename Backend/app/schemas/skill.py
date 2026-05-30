"""Pydantic schemas for Skill and SkillCategory."""
from pydantic import BaseModel, Field
from typing import List, Optional

class SkillBase(BaseModel):
    name: str
    level: int = Field(..., ge=1, le=100, description="Skill proficiency level between 1 and 100")
    description: Optional[str] = None
    highlight: Optional[str] = None
    category_id: Optional[int] = None

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    level: Optional[int] = Field(None, ge=1, le=100)
    description: Optional[str] = None
    highlight: Optional[str] = None
    category_id: Optional[int] = None

class SkillResponse(SkillBase):
    id: int

    class Config:
        from_attributes = True

class SkillCategoryBase(BaseModel):
    category_id: str
    label: str
    icon: str
    summary: str
    image: str
    accent: str
    tint: str

class SkillCategoryCreate(SkillCategoryBase):
    pass

class SkillCategoryUpdate(BaseModel):
    category_id: Optional[str] = None
    label: Optional[str] = None
    icon: Optional[str] = None
    summary: Optional[str] = None
    image: Optional[str] = None
    accent: Optional[str] = None
    tint: Optional[str] = None

class SkillCategoryResponse(SkillCategoryBase):
    id: int
    skills: List[SkillResponse] = []

    class Config:
        from_attributes = True

class SkillCategoryListResponse(SkillCategoryBase):
    id: int

    class Config:
        from_attributes = True
