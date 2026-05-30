"""Repository layer for Achievement database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.achievement import Achievement

class AchievementRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self) -> List[Achievement]:
        """Fetch all achievements."""
        result = await self.session.execute(select(Achievement))
        return list(result.scalars().all())

    async def get_by_id(self, achievement_id: int) -> Optional[Achievement]:
        """Fetch an achievement by database ID."""
        result = await self.session.execute(
            select(Achievement).where(Achievement.id == achievement_id)
        )
        return result.scalars().first()

    async def create(self, achievement: Achievement) -> Achievement:
        """Create a new achievement."""
        self.session.add(achievement)
        await self.session.commit()
        await self.session.refresh(achievement)
        return achievement

    async def update(self, achievement: Achievement) -> Achievement:
        """Update an existing achievement."""
        self.session.add(achievement)
        await self.session.commit()
        await self.session.refresh(achievement)
        return achievement

    async def delete(self, achievement: Achievement) -> None:
        """Delete an achievement."""
        await self.session.delete(achievement)
        await self.session.commit()
