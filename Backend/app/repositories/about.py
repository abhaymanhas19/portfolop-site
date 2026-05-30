"""Repository layer for Experience and ExperienceAchievement database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.about import Experience, ExperienceAchievement

class ExperienceRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self) -> List[Experience]:
        """Fetch all experiences along with related achievements."""
        result = await self.session.execute(
            select(Experience).options(selectinload(Experience.achievements))
        )
        return list(result.scalars().all())

    async def get_by_id(self, experience_id: int) -> Optional[Experience]:
        """Fetch a single experience by database ID."""
        result = await self.session.execute(
            select(Experience)
            .where(Experience.id == experience_id)
            .options(selectinload(Experience.achievements))
        )
        return result.scalars().first()

    async def create(self, experience: Experience) -> Experience:
        """Create a new experience."""
        self.session.add(experience)
        await self.session.commit()
        await self.session.refresh(experience)
        return experience

    async def update(self, experience: Experience) -> Experience:
        """Update an existing experience."""
        self.session.add(experience)
        await self.session.commit()
        await self.session.refresh(experience)
        return experience

    async def delete(self, experience: Experience) -> None:
        """Delete an experience."""
        await self.session.delete(experience)
        await self.session.commit()

    async def get_achievement_by_id(self, achievement_id: int) -> Optional[ExperienceAchievement]:
        """Fetch an experience achievement by ID."""
        result = await self.session.execute(
            select(ExperienceAchievement).where(ExperienceAchievement.id == achievement_id)
        )
        return result.scalars().first()

    async def create_achievement(self, achievement: ExperienceAchievement) -> ExperienceAchievement:
        """Add an achievement detail to an experience."""
        self.session.add(achievement)
        await self.session.commit()
        await self.session.refresh(achievement)
        return achievement

    async def delete_achievement(self, achievement: ExperienceAchievement) -> None:
        """Delete an experience achievement detail."""
        await self.session.delete(achievement)
        await self.session.commit()
