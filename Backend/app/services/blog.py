from fastapi import HTTPException
from typing import List
from app.repositories.blog import BlogRepository
from app.models.blog import Blog

class BlogService:
    def __init__(self, repository: BlogRepository):
        self.repository = repository

    async def get_all_blogs(self) -> List[Blog]:
        """Business logic to get all blogs."""
        return await self.repository.get_all()

    async def get_blog_by_slug(self, slug: str) -> Blog:
        """Business logic to get a single blog, raising an error if not found."""
        blog = await self.repository.get_by_slug(slug)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        return blog
