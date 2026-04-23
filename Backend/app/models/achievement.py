from typing import Optional
from sqlmodel import SQLModel, Field

class Achievement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    achievement_id: str
    title: str
    issuer: str
    year: str
    summary: str
    badgeImage: str
    credentialUrl: Optional[str] = None
    category: str
