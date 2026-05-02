from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.models.blog import Blog

class BlogRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self) -> List[Blog]:
        """Fetch all blogs from the database."""
        result = await self.session.execute(select(Blog).options(selectinload(Blog.images)))
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> Optional[Blog]:
        """Fetch a single blog by its slug."""
        result = await self.session.execute(select(Blog).where(Blog.slug == slug).options(selectinload(Blog.images)))
        return result.scalars().first()
