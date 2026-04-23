from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class SkillCategory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    category_id: str  # e.g., 'backend'
    label: str
    icon: str
    summary: str
    image: str
    accent: str
    tint: str
    
    skills: List["Skill"] = Relationship(back_populates="category")

class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    level: int
    description: Optional[str] = None
    highlight: Optional[str] = None
    category_id: Optional[int] = Field(default=None, foreign_key="skillcategory.id")
    
    category: Optional[SkillCategory] = Relationship(back_populates="skills")
