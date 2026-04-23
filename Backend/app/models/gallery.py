from typing import Optional
from sqlmodel import SQLModel, Field

class GalleryProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    tagline: str
    image: str
    highlight: str
    cta: str

class GalleryCarousel(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    src: str
    media_type: str  # 'image' or 'video'
    alt: str
    title: Optional[str] = None
    description: Optional[str] = None

class GalleryImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    src: str
    alt: str
    width: int
    height: int
    title: Optional[str] = None
    location: Optional[str] = None
    capturedAt: Optional[str] = None
    description: Optional[str] = None
