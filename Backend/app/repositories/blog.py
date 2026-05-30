"""Repository layer for Blog and BlogImage database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.blog import Blog, BlogImage

class BlogRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self) -> List[Blog]:
        """Fetch all blogs along with related images."""
        result = await self.session.execute(
            select(Blog).options(selectinload(Blog.images))
        )
        return list(result.scalars().all())

    async def get_by_id(self, blog_id: int) -> Optional[Blog]:
        """Fetch a single blog by its ID."""
        result = await self.session.execute(
            select(Blog).where(Blog.id == blog_id).options(selectinload(Blog.images))
        )
        return result.scalars().first()

    async def get_by_slug(self, slug: str) -> Optional[Blog]:
        """Fetch a single blog by its unique slug."""
        result = await self.session.execute(
            select(Blog).where(Blog.slug == slug).options(selectinload(Blog.images))
        )
        return result.scalars().first()

    async def create(self, blog: Blog) -> Blog:
        """Create a new blog."""
        self.session.add(blog)
        await self.session.commit()
        await self.session.refresh(blog)
        return blog

    async def update(self, blog: Blog) -> Blog:
        """Update an existing blog."""
        self.session.add(blog)
        await self.session.commit()
        await self.session.refresh(blog)
        return blog

    async def delete(self, blog: Blog) -> None:
        """Delete a blog."""
        await self.session.delete(blog)
        await self.session.commit()

    async def get_image_by_id(self, image_id: int) -> Optional[BlogImage]:
        """Fetch a blog image by ID."""
        result = await self.session.execute(
            select(BlogImage).where(BlogImage.id == image_id)
        )
        return result.scalars().first()

    async def create_image(self, image: BlogImage) -> BlogImage:
        """Add an image to a blog post."""
        self.session.add(image)
        await self.session.commit()
        await self.session.refresh(image)
        return image

    async def delete_image(self, image: BlogImage) -> None:
        """Delete a blog image."""
        await self.session.delete(image)
        await self.session.commit()
