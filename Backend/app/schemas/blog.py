from pydantic import BaseModel
from typing import List, Optional

class BlogImageResponse(BaseModel):
    id: int
    image_url: str
    
    class Config:
        orm_mode = True
        from_attributes = True

class BlogListResponse(BaseModel):
    """Schema for validating and formatting the Blog list API response, omitting heavy content."""
    id: int
    slug: str
    title: str
    date: str
    tags: List[str]
    images: List[BlogImageResponse] = []

    class Config:
        orm_mode = True
        from_attributes = True

class BlogResponse(BlogListResponse):
    """Schema for validating and formatting a single Blog API response, including full content."""
    summary: str
    content: str
