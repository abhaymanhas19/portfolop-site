"""Pydantic schemas for Blog and BlogImage models."""
from pydantic import BaseModel
from typing import List, Optional

class BlogImageBase(BaseModel):
    image_url: str
    blog_id: Optional[int] = None

class BlogImageCreate(BlogImageBase):
    pass

class BlogImageResponse(BlogImageBase):
    id: int

    class Config:
        from_attributes = True

class BlogBase(BaseModel):
    slug: str
    title: str
    category: str
    summary: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    tags: List[str] = []

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    tags: Optional[List[str]] = None

class BlogResponse(BlogBase):
    id: int
    images: List[BlogImageResponse] = []

    class Config:
        from_attributes = True

class BlogListResponse(BlogBase):
    id: int

    class Config:
        from_attributes = True
