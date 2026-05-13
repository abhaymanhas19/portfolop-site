from typing import Optional
from sqlmodel import SQLModel, Field

class SocialLink(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    platform: str # e.g., 'GitHub', 'LinkedIn'
    url: str
    icon: Optional[str] = None # e.g., 'github' or icon class
