"""Pydantic schemas for SocialLink CRUD."""
from pydantic import BaseModel
from typing import Optional

class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon: Optional[str] = None

class SocialLinkCreate(SocialLinkBase):
    pass

class SocialLinkUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    icon: Optional[str] = None

class SocialLinkResponse(SocialLinkBase):
    id: int

    class Config:
        from_attributes = True
