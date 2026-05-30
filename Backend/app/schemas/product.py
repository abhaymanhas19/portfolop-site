"""Pydantic schemas for ProductProfile, ProductCarousel, and ProductImage models."""
from pydantic import BaseModel
from typing import List, Optional

# --- Carousel schemas ---
class ProductCarouselBase(BaseModel):
    src: str
    media_type: str  # e.g. 'image', 'video'
    alt: str
    title: Optional[str] = None
    description: Optional[str] = None
    profile_id: Optional[int] = None

class ProductCarouselCreate(ProductCarouselBase):
    pass

class ProductCarouselResponse(ProductCarouselBase):
    id: int

    class Config:
        from_attributes = True

# --- Image schemas ---
class ProductImageBase(BaseModel):
    src: str
    alt: str
    width: int
    height: int
    title: Optional[str] = None
    location: Optional[str] = None
    capturedAt: Optional[str] = None
    description: Optional[str] = None
    profile_id: Optional[int] = None

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageResponse(ProductImageBase):
    id: int

    class Config:
        from_attributes = True

# --- Profile schemas ---
class ProductProfileBase(BaseModel):
    name: str
    tagline: str
    image: str
    highlight: str
    cta: str

class ProductProfileCreate(ProductProfileBase):
    pass

class ProductProfileUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    image: Optional[str] = None
    highlight: Optional[str] = None
    cta: Optional[str] = None

class ProductProfileResponse(ProductProfileBase):
    id: int
    carousels: List[ProductCarouselResponse] = []
    images: List[ProductImageResponse] = []

    class Config:
        from_attributes = True

class ProductProfileListResponse(ProductProfileBase):
    id: int

    class Config:
        from_attributes = True
