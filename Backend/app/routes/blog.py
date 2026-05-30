"""FastAPI router for Blog CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.blog import BlogRepository
from app.services.blog import BlogService
from app.schemas.blog import (
    BlogResponse, BlogListResponse, BlogCreate, BlogUpdate,
    BlogImageResponse, BlogImageCreate
)

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)

def get_blog_service(session: AsyncSession = Depends(get_async_session)) -> BlogService:
    repository = BlogRepository(session)
    return BlogService(repository)

@router.get("/", response_model=List[BlogListResponse])
async def get_all_blogs(service: BlogService = Depends(get_blog_service)):
    """Retrieve all blogs."""
    return await service.get_all_blogs()

@router.get("/{slug}", response_model=BlogResponse)
async def get_blog_by_slug(
    slug: str = Path(..., description="The unique slug of the blog"),
    service: BlogService = Depends(get_blog_service)
):
    """Retrieve a single blog by its slug."""
    return await service.get_blog_by_slug(slug)

@router.get("/id/{id}", response_model=BlogResponse)
async def get_blog_by_id(
    id: int = Path(..., description="The database primary key ID of the blog"),
    service: BlogService = Depends(get_blog_service)
):
    """Retrieve a single blog by its ID."""
    return await service.get_blog_by_id(id)

@router.post("/", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
async def create_blog(
    data: BlogCreate,
    service: BlogService = Depends(get_blog_service)
):
    """Create a new blog post."""
    return await service.create_blog(data)

@router.put("/{id}", response_model=BlogResponse)
async def update_blog(
    data: BlogUpdate,
    id: int = Path(..., description="The ID of the blog post to update"),
    service: BlogService = Depends(get_blog_service)
):
    """Update an existing blog post."""
    return await service.update_blog(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(
    id: int = Path(..., description="The ID of the blog post to delete"),
    service: BlogService = Depends(get_blog_service)
):
    """Delete a blog post and its associated image records."""
    await service.delete_blog(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_blog(
    id: int = Path(..., description="The ID of the blog post to cross-check"),
    service: BlogService = Depends(get_blog_service)
):
    """Verify tag structures, content length and image link connectivity."""
    return await service.cross_check_blog(id)

# --- Blog Image Endpoints ---

@router.post("/images", response_model=BlogImageResponse, status_code=status.HTTP_201_CREATED)
async def add_blog_image(
    data: BlogImageCreate,
    service: BlogService = Depends(get_blog_service)
):
    """Add an image record to a blog post."""
    return await service.add_blog_image(data)

@router.delete("/images/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_image(
    id: int = Path(..., description="The ID of the blog image to delete"),
    service: BlogService = Depends(get_blog_service)
):
    """Delete a blog image record."""
    await service.delete_blog_image(id)
