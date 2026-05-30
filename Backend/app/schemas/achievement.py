"""Pydantic schemas for Achievement CRUD."""
from pydantic import BaseModel
from typing import Optional
from app.models.achievement import AchievementCategory

class AchievementBase(BaseModel):
    title: str
    issuer: str
    year: str
    summary: str
    badgeImage: str
    credentialUrl: Optional[str] = None
    category: AchievementCategory = AchievementCategory.BACKEND

class AchievementCreate(AchievementBase):
    pass

class AchievementUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    year: Optional[str] = None
    summary: Optional[str] = None
    badgeImage: Optional[str] = None
    credentialUrl: Optional[str] = None
    category: Optional[AchievementCategory] = None

class AchievementResponse(AchievementBase):
    id: int

    class Config:
        from_attributes = True
