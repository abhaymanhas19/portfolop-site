from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class ExperienceAchievement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    experience_id: Optional[int] = Field(default=None, foreign_key="experience.id")
    
    experience: Optional["Experience"] = Relationship(back_populates="achievements")

class Experience(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    job_title: str
    company_name: str
    company_url: Optional[str] = None
    summary: str
    start_date: str
    end_date: str
    
    achievements: List["ExperienceAchievement"] = Relationship(back_populates="experience")


