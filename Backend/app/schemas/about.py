"""Pydantic schemas for Experience and ExperienceAchievement models."""
from pydantic import BaseModel
from typing import List, Optional

class ExperienceAchievementBase(BaseModel):
    content: str
    experience_id: Optional[int] = None

class ExperienceAchievementCreate(ExperienceAchievementBase):
    pass

class ExperienceAchievementResponse(ExperienceAchievementBase):
    id: int

    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    job_title: str
    company_name: str
    company_url: Optional[str] = None
    summary: str
    start_date: str  # Format: e.g., 'YYYY-MM' or 'Month YYYY'
    end_date: str    # Format: e.g., 'YYYY-MM', 'Month YYYY', or 'Present'

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    job_title: Optional[str] = None
    company_name: Optional[str] = None
    company_url: Optional[str] = None
    summary: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class ExperienceResponse(ExperienceBase):
    id: int
    achievements: List[ExperienceAchievementResponse] = []

    class Config:
        from_attributes = True

class ExperienceListResponse(ExperienceBase):
    id: int

    class Config:
        from_attributes = True
