from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Experience(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: str
    company: str
    period: str
    summary: str
    link: Optional[str] = None
    
    achievements: List["ExperienceAchievement"] = Relationship(back_populates="experience")

class ExperienceAchievement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    experience_id: Optional[int] = Field(default=None, foreign_key="experience.id")
    
    experience: Optional[Experience] = Relationship(back_populates="achievements")
