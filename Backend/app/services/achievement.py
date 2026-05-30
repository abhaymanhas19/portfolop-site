"""Service layer for Achievement operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.achievement import AchievementRepository
from app.models.achievement import Achievement
from app.schemas.achievement import AchievementCreate, AchievementUpdate

logger = logging.getLogger(__name__)

class AchievementService:
    def __init__(self, repository: AchievementRepository) -> None:
        self.repository = repository

    async def get_all_achievements(self) -> List[Achievement]:
        """Fetch all achievements."""
        return await self.repository.get_all()

    async def get_achievement_by_id(self, achievement_id: int) -> Achievement:
        """Fetch achievement by ID, raising an error if not found."""
        achievement = await self.repository.get_by_id(achievement_id)
        if not achievement:
            raise HTTPException(status_code=404, detail=f"Achievement with ID {achievement_id} not found")
        return achievement

    async def create_achievement(self, data: AchievementCreate) -> Achievement:
        """Create a new achievement."""
        achievement = Achievement(**data.model_dump())
        return await self.repository.create(achievement)

    async def update_achievement(self, achievement_id: int, data: AchievementUpdate) -> Achievement:
        """Update an existing achievement."""
        achievement = await self.get_achievement_by_id(achievement_id)
        update_dict = data.model_dump(exclude_unset=True)

        for key, value in update_dict.items():
            setattr(achievement, key, value)

        return await self.repository.update(achievement)

    async def delete_achievement(self, achievement_id: int) -> None:
        """Delete an achievement."""
        achievement = await self.get_achievement_by_id(achievement_id)
        await self.repository.delete(achievement)

    async def cross_check_achievement(self, achievement_id: int) -> Dict[str, Any]:
        """Verifies the reachability of badgeImage and credentials link."""
        achievement = await self.get_achievement_by_id(achievement_id)
        issues = []
        checks = {}

        async def check_url(url_val: Optional[str], label: str) -> None:
            if not url_val:
                checks[label] = "Not Configured"
                return
            if url_val.startswith("http://") or url_val.startswith("https://"):
                try:
                    async with httpx.AsyncClient() as client:
                        resp = await client.head(url_val, timeout=5.0)
                        if resp.status_code >= 400:
                            resp = await client.get(url_val, timeout=5.0)
                        if resp.status_code >= 400:
                            issues.append(f"{label} URL returned status code {resp.status_code}")
                            checks[label] = f"Failed ({resp.status_code})"
                        else:
                            checks[label] = "Success"
                except Exception as e:
                    issues.append(f"Could not reach {label} URL: {str(e)}")
                    checks[label] = "Unreachable"
            else:
                checks[label] = "Skipped (Relative URL)"

        await check_url(achievement.badgeImage, "Badge Image URL")
        await check_url(achievement.credentialUrl, "Credential Verification URL")

        return {
            "entity": "Achievement",
            "entity_id": achievement_id,
            "achievement_title": achievement.title,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }
