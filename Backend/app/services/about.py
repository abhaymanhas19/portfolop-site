"""Service layer for Experience and ExperienceAchievement operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.about import ExperienceRepository
from app.models.about import Experience, ExperienceAchievement
from app.schemas.about import ExperienceCreate, ExperienceUpdate, ExperienceAchievementCreate

logger = logging.getLogger(__name__)

class ExperienceService:
    def __init__(self, repository: ExperienceRepository) -> None:
        self.repository = repository

    async def get_all_experiences(self) -> List[Experience]:
        """Fetch all experiences."""
        return await self.repository.get_all()

    async def get_experience_by_id(self, experience_id: int) -> Experience:
        """Fetch experience by ID, raising an error if not found."""
        experience = await self.repository.get_by_id(experience_id)
        if not experience:
            raise HTTPException(status_code=404, detail=f"Experience with ID {experience_id} not found")
        return experience

    async def create_experience(self, data: ExperienceCreate) -> Experience:
        """Create a new experience."""
        experience = Experience(**data.model_dump())
        return await self.repository.create(experience)

    async def update_experience(self, experience_id: int, data: ExperienceUpdate) -> Experience:
        """Update an existing experience."""
        experience = await self.get_experience_by_id(experience_id)
        update_dict = data.model_dump(exclude_unset=True)

        for key, value in update_dict.items():
            setattr(experience, key, value)

        return await self.repository.update(experience)

    async def delete_experience(self, experience_id: int) -> None:
        """Delete an experience and its associated achievement records."""
        experience = await self.get_experience_by_id(experience_id)
        
        # Explicitly delete children achievements
        for achievement in list(experience.achievements):
            await self.repository.delete_achievement(achievement)
            
        await self.repository.delete(experience)

    async def add_achievement(self, data: ExperienceAchievementCreate) -> ExperienceAchievement:
        """Add an achievement detail to an experience."""
        if data.experience_id is not None:
            await self.get_experience_by_id(data.experience_id)
        achievement = ExperienceAchievement(**data.model_dump())
        return await self.repository.create_achievement(achievement)

    async def delete_achievement(self, achievement_id: int) -> None:
        """Delete an experience achievement detail."""
        achievement = await self.repository.get_achievement_by_id(achievement_id)
        if not achievement:
            raise HTTPException(status_code=404, detail=f"Experience achievement with ID {achievement_id} not found")
        await self.repository.delete_achievement(achievement)

    async def cross_check_experience(self, experience_id: int) -> Dict[str, Any]:
        """Validate company URL reachability and data completeness."""
        experience = await self.get_experience_by_id(experience_id)
        issues = []
        checks = {}

        # 1. Validate Company URL
        url_val = experience.company_url
        if not url_val:
            checks["company_url"] = "Not Configured"
        elif url_val.startswith("http://") or url_val.startswith("https://"):
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.head(url_val, timeout=5.0)
                    if resp.status_code >= 400:
                        resp = await client.get(url_val, timeout=5.0)
                    if resp.status_code >= 400:
                        issues.append(f"Company URL returned status code {resp.status_code}")
                        checks["company_url"] = f"Failed ({resp.status_code})"
                    else:
                        checks["company_url"] = "Success"
            except Exception as e:
                issues.append(f"Could not reach Company URL: {str(e)}")
                checks["company_url"] = "Unreachable"
        else:
            checks["company_url"] = "Skipped (Relative URL)"

        # 2. Basic date validations
        if not experience.start_date:
            issues.append("Start date is missing or empty")
            checks["start_date_presence"] = "Failed"
        else:
            checks["start_date_presence"] = "Success"

        if not experience.end_date:
            issues.append("End date is missing or empty")
            checks["end_date_presence"] = "Failed"
        else:
            checks["end_date_presence"] = "Success"

        # 3. Achievements list validation
        checks["achievements_count"] = len(experience.achievements)
        if not experience.achievements:
            issues.append("Experience has no achievements listed")
            checks["achievements_validation"] = "Warning (No Achievements)"
        else:
            checks["achievements_validation"] = "Success"

        return {
            "entity": "Experience",
            "entity_id": experience_id,
            "company_name": experience.company_name,
            "job_title": experience.job_title,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }
