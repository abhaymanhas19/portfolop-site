"""Service layer for Skill and SkillCategory operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.skill import SkillRepository
from app.models.skill import Skill, SkillCategory
from app.schemas.skill import SkillCreate, SkillUpdate, SkillCategoryCreate, SkillCategoryUpdate

logger = logging.getLogger(__name__)

class SkillService:
    def __init__(self, repository: SkillRepository) -> None:
        self.repository = repository

    async def get_all_categories(self) -> List[SkillCategory]:
        """Fetch all skill categories."""
        return await self.repository.get_all_categories()

    async def get_category_by_id(self, category_id: int) -> SkillCategory:
        """Fetch a skill category by ID, raising an error if not found."""
        category = await self.repository.get_category_by_id(category_id)
        if not category:
            raise HTTPException(status_code=404, detail=f"Skill Category with ID {category_id} not found")
        return category

    async def create_category(self, data: SkillCategoryCreate) -> SkillCategory:
        """Create a new skill category, verifying string category_id uniqueness."""
        existing = await self.repository.get_category_by_string_id(data.category_id)
        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Skill Category with category_id '{data.category_id}' already exists."
            )
        category = SkillCategory(**data.model_dump())
        return await self.repository.create_category(category)

    async def update_category(self, category_id: int, data: SkillCategoryUpdate) -> SkillCategory:
        """Update an existing skill category."""
        category = await self.get_category_by_id(category_id)
        
        # Check string category_id uniqueness if updated
        update_dict = data.model_dump(exclude_unset=True)
        if "category_id" in update_dict and update_dict["category_id"] != category.category_id:
            existing = await self.repository.get_category_by_string_id(update_dict["category_id"])
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail=f"Skill Category with category_id '{update_dict['category_id']}' already exists."
                )

        for key, value in update_dict.items():
            setattr(category, key, value)
            
        return await self.repository.update_category(category)

    async def delete_category(self, category_id: int) -> None:
        """Delete an existing category after checking related skills."""
        category = await self.get_category_by_id(category_id)
        if category.skills:
            raise HTTPException(
                status_code=400,
                detail="Cannot delete category because it has active skills linked to it. Delete those skills first."
            )
        await self.repository.delete_category(category)

    async def get_all_skills(self) -> List[Skill]:
        """Fetch all skills."""
        return await self.repository.get_all_skills()

    async def get_skill_by_id(self, skill_id: int) -> Skill:
        """Fetch skill by ID, raising an error if not found."""
        skill = await self.repository.get_skill_by_id(skill_id)
        if not skill:
            raise HTTPException(status_code=404, detail=f"Skill with ID {skill_id} not found")
        return skill

    async def create_skill(self, data: SkillCreate) -> Skill:
        """Create a new skill after validating that the referenced category exists."""
        if data.category_id is not None:
            await self.get_category_by_id(data.category_id)
        skill = Skill(**data.model_dump())
        return await self.repository.create_skill(skill)

    async def update_skill(self, skill_id: int, data: SkillUpdate) -> Skill:
        """Update an existing skill, verifying category if changed."""
        skill = await self.get_skill_by_id(skill_id)
        update_dict = data.model_dump(exclude_unset=True)
        
        if "category_id" in update_dict and update_dict["category_id"] is not None:
            await self.get_category_by_id(update_dict["category_id"])
            
        for key, value in update_dict.items():
            setattr(skill, key, value)
            
        return await self.repository.update_skill(skill)

    async def delete_skill(self, skill_id: int) -> None:
        """Delete a skill."""
        skill = await self.get_skill_by_id(skill_id)
        await self.repository.delete_skill(skill)

    async def cross_check_category(self, category_id: int) -> Dict[str, Any]:
        """Performs data validation and connectivity verification check on a Category."""
        category = await self.get_category_by_id(category_id)
        issues = []
        checks = {}
        
        # Verify Image accessibility (if URL is absolute)
        image_url = category.image
        if image_url.startswith("http://") or image_url.startswith("https://"):
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.head(image_url, timeout=5.0)
                    if resp.status_code >= 400:
                        issues.append(f"Category image URL returned status code {resp.status_code}")
                        checks["image_status"] = f"Failed ({resp.status_code})"
                    else:
                        checks["image_status"] = "Success"
            except Exception as e:
                issues.append(f"Could not reach category image URL: {str(e)}")
                checks["image_status"] = "Unreachable"
        else:
            checks["image_status"] = "Skipped (Local/Relative Path)"

        # Check sub-skills levels integrity
        skills_checked = len(category.skills)
        invalid_levels = [s.name for s in category.skills if not (1 <= s.level <= 100)]
        if invalid_levels:
            issues.append(f"Skills with invalid proficiency level (must be 1-100): {invalid_levels}")
            checks["skills_proficiency"] = "Failed"
        else:
            checks["skills_proficiency"] = "Success"

        checks["total_skills_count"] = skills_checked
        return {
            "entity": "SkillCategory",
            "entity_id": category_id,
            "category_id_str": category.category_id,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }

    async def cross_check_skill(self, skill_id: int) -> Dict[str, Any]:
        """Performs structural and database logic verification checks on a single Skill."""
        skill = await self.get_skill_by_id(skill_id)
        issues = []
        checks = {}

        # Range checks
        if not (1 <= skill.level <= 100):
            issues.append(f"Proficiency level '{skill.level}' is out of range [1, 100]")
            checks["level_range"] = "Failed"
        else:
            checks["level_range"] = "Success"

        # Check if parent category exists
        if skill.category_id is not None:
            category = await self.repository.get_category_by_id(skill.category_id)
            if not category:
                issues.append(f"Referenced category_id {skill.category_id} does not exist in database")
                checks["category_existence"] = "Failed"
            else:
                checks["category_existence"] = "Success"
        else:
            issues.append("Skill is orphaned (no category_id assigned)")
            checks["category_existence"] = "None"

        return {
            "entity": "Skill",
            "entity_id": skill_id,
            "skill_name": skill.name,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }
