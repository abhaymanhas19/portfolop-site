from enum import Enum
from typing import Optional
from sqlmodel import SQLModel, Field

class AchievementCategory(str, Enum):
    BACKEND = "Backend"
    AI_ML = "Ai/ml"
    CLOUD_DEVOPS = "cloud & devops"
    PROBLEM_SOLVING = "problemsolving"

class Achievement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    issuer: str
    year: str
    summary: str
    badgeImage: str
    credentialUrl: Optional[str] = None
    category: AchievementCategory = Field(default=AchievementCategory.BACKEND)
