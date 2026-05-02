from fastapi import APIRouter, Depends, Path
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_async_session
from app.repositories.blog import BlogRepository
from app.services.blog import BlogService
from app.schemas.blog import BlogResponse, BlogListResponse

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)

# Dependency to inject the BlogService into our routes
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
