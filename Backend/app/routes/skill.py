"""FastAPI router for Skill and SkillCategory CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.skill import SkillRepository
from app.services.skill import SkillService
from app.schemas.skill import (
    SkillResponse, SkillCreate, SkillUpdate,
    SkillCategoryResponse, SkillCategoryListResponse, SkillCategoryCreate, SkillCategoryUpdate
)

router = APIRouter(
    prefix="/skills",
    tags=["Skills & Categories"]
)

def get_skill_service(session: AsyncSession = Depends(get_async_session)) -> SkillService:
    repository = SkillRepository(session)
    return SkillService(repository)

# --- Category Endpoints ---

@router.get("/categories", response_model=List[SkillCategoryResponse])
async def list_categories(service: SkillService = Depends(get_skill_service)):
    """Retrieve all skill categories including their associated skills."""
    return await service.get_all_categories()

@router.get("/categories/{id}", response_model=SkillCategoryResponse)
async def get_category(
    id: int = Path(..., description="The ID of the category"),
    service: SkillService = Depends(get_skill_service)
):
    """Retrieve details for a single skill category by its database ID."""
    return await service.get_category_by_id(id)

@router.post("/categories", response_model=SkillCategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    data: SkillCategoryCreate,
    service: SkillService = Depends(get_skill_service)
):
    """Create a new skill category."""
    return await service.create_category(data)

@router.put("/categories/{id}", response_model=SkillCategoryResponse)
async def update_category(
    data: SkillCategoryUpdate,
    id: int = Path(..., description="The ID of the category to update"),
    service: SkillService = Depends(get_skill_service)
):
    """Update an existing skill category."""
    return await service.update_category(id, data)

@router.delete("/categories/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    id: int = Path(..., description="The ID of the category to delete"),
    service: SkillService = Depends(get_skill_service)
):
    """Delete a skill category. The category must not contain any skills."""
    await service.delete_category(id)

@router.post("/categories/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_category(
    id: int = Path(..., description="The ID of the category to cross-check"),
    service: SkillService = Depends(get_skill_service)
):
    """Performs integrity and health verification for a skill category and its assets."""
    return await service.cross_check_category(id)

# --- Skill Endpoints ---

@router.get("/", response_model=List[SkillResponse])
async def list_skills(service: SkillService = Depends(get_skill_service)):
    """Retrieve all individual skills."""
    return await service.get_all_skills()

@router.get("/{id}", response_model=SkillResponse)
async def get_skill(
    id: int = Path(..., description="The ID of the skill"),
    service: SkillService = Depends(get_skill_service)
):
    """Retrieve a single skill by ID."""
    return await service.get_skill_by_id(id)

@router.post("/", response_model=SkillResponse, status_code=status.HTTP_201_CREATED)
async def create_skill(
    data: SkillCreate,
    service: SkillService = Depends(get_skill_service)
):
    """Create a new skill."""
    return await service.create_skill(data)

@router.put("/{id}", response_model=SkillResponse)
async def update_skill(
    data: SkillUpdate,
    id: int = Path(..., description="The ID of the skill to update"),
    service: SkillService = Depends(get_skill_service)
):
    """Update an existing skill."""
    return await service.update_skill(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(
    id: int = Path(..., description="The ID of the skill to delete"),
    service: SkillService = Depends(get_skill_service)
):
    """Delete a skill."""
    await service.delete_skill(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_skill(
    id: int = Path(..., description="The ID of the skill to cross-check"),
    service: SkillService = Depends(get_skill_service)
):
    """Validate skill values range and associations."""
    return await service.cross_check_skill(id)
