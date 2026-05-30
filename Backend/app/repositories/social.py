"""Repository layer for SocialLink database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.social import SocialLink

class SocialLinkRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self) -> List[SocialLink]:
        """Fetch all social links."""
        result = await self.session.execute(select(SocialLink))
        return list(result.scalars().all())

    async def get_by_id(self, social_id: int) -> Optional[SocialLink]:
        """Fetch a single social link by ID."""
        result = await self.session.execute(
            select(SocialLink).where(SocialLink.id == social_id)
        )
        return result.scalars().first()

    async def create(self, social_link: SocialLink) -> SocialLink:
        """Create a new social link."""
        self.session.add(social_link)
        await self.session.commit()
        await self.session.refresh(social_link)
        return social_link

    async def update(self, social_link: SocialLink) -> SocialLink:
        """Update an existing social link."""
        self.session.add(social_link)
        await self.session.commit()
        await self.session.refresh(social_link)
        return social_link

    async def delete(self, social_link: SocialLink) -> None:
        """Delete a social link."""
        await self.session.delete(social_link)
        await self.session.commit()
