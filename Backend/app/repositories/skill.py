"""Repository pattern for Skill and SkillCategory database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.skill import Skill, SkillCategory

class SkillRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all_categories(self) -> List[SkillCategory]:
        """Fetch all skill categories along with related skills."""
        result = await self.session.execute(
            select(SkillCategory).options(selectinload(SkillCategory.skills))
        )
        return list(result.scalars().all())

    async def get_category_by_id(self, category_id_db: int) -> Optional[SkillCategory]:
        """Fetch a single skill category by its database primary key ID."""
        result = await self.session.execute(
            select(SkillCategory)
            .where(SkillCategory.id == category_id_db)
            .options(selectinload(SkillCategory.skills))
        )
        return result.scalars().first()

    async def get_category_by_string_id(self, category_id_str: str) -> Optional[SkillCategory]:
        """Fetch a single skill category by its string category_id field (e.g. 'backend')."""
        result = await self.session.execute(
            select(SkillCategory)
            .where(SkillCategory.category_id == category_id_str)
            .options(selectinload(SkillCategory.skills))
        )
        return result.scalars().first()

    async def create_category(self, category: SkillCategory) -> SkillCategory:
        """Create a new skill category."""
        self.session.add(category)
        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def update_category(self, category: SkillCategory) -> SkillCategory:
        """Update an existing skill category."""
        self.session.add(category)
        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def delete_category(self, category: SkillCategory) -> None:
        """Delete a skill category."""
        await self.session.delete(category)
        await self.session.commit()

    async def get_all_skills(self) -> List[Skill]:
        """Fetch all individual skills."""
        result = await self.session.execute(select(Skill))
        return list(result.scalars().all())

    async def get_skill_by_id(self, skill_id: int) -> Optional[Skill]:
        """Fetch a single skill by its ID."""
        result = await self.session.execute(select(Skill).where(Skill.id == skill_id))
        return result.scalars().first()

    async def create_skill(self, skill: Skill) -> Skill:
        """Create a new skill."""
        self.session.add(skill)
        await self.session.commit()
        await self.session.refresh(skill)
        return skill

    async def update_skill(self, skill: Skill) -> Skill:
        """Update an existing skill."""
        self.session.add(skill)
        await self.session.commit()
        await self.session.refresh(skill)
        return skill

    async def delete_skill(self, skill: Skill) -> None:
        """Delete a skill."""
        await self.session.delete(skill)
        await self.session.commit()
