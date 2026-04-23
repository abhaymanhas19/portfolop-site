from typing import Optional
from sqlmodel import SQLModel, Field

class Branding(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    role: str
    tagline: str
    location: str
    contactEmail: str
    resumePath: str
    avatar: str

class Social(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    social_id: str  # e.g., 'github'
    label: str
    icon: str
    url: str
