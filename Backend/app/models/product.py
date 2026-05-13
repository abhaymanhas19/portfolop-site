from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class ProductProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    tagline: str
    image: str
    highlight: str
    cta: str

    carousels: List["ProductCarousel"] = Relationship(back_populates="profile")
    images: List["ProductImage"] = Relationship(back_populates="profile")

class ProductCarousel(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    src: str
    media_type: str
    alt: str
    title: Optional[str] = None
    description: Optional[str] = None
    
    profile_id: Optional[int] = Field(default=None, foreign_key="productprofile.id")
    profile: Optional[ProductProfile] = Relationship(back_populates="carousels")

class ProductImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    src: str
    alt: str
    width: int
    height: int
    title: Optional[str] = None
    location: Optional[str] = None
    capturedAt: Optional[str] = None
    description: Optional[str] = None

    profile_id: Optional[int] = Field(default=None, foreign_key="productprofile.id")
    profile: Optional[ProductProfile] = Relationship(back_populates="images")
