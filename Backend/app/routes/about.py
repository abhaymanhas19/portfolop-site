"""FastAPI router for Experience and ExperienceAchievement CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.about import ExperienceRepository
from app.services.about import ExperienceService
from app.schemas.about import (
    ExperienceResponse, ExperienceListResponse, ExperienceCreate, ExperienceUpdate,
    ExperienceAchievementResponse, ExperienceAchievementCreate
)

router = APIRouter(
    prefix="/experiences",
    tags=["Experiences (About)"]
)

def get_experience_service(session: AsyncSession = Depends(get_async_session)) -> ExperienceService:
    repository = ExperienceRepository(session)
    return ExperienceService(repository)

@router.get("/", response_model=List[ExperienceListResponse])
async def list_experiences(service: ExperienceService = Depends(get_experience_service)):
    """Retrieve all experiences."""
    return await service.get_all_experiences()

@router.get("/{id}", response_model=ExperienceResponse)
async def get_experience(
    id: int = Path(..., description="The ID of the experience"),
    service: ExperienceService = Depends(get_experience_service)
):
    """Retrieve details for a single experience by ID."""
    return await service.get_experience_by_id(id)

@router.post("/", response_model=ExperienceResponse, status_code=status.HTTP_201_CREATED)
async def create_experience(
    data: ExperienceCreate,
    service: ExperienceService = Depends(get_experience_service)
):
    """Create a new experience."""
    return await service.create_experience(data)

@router.put("/{id}", response_model=ExperienceResponse)
async def update_experience(
    data: ExperienceUpdate,
    id: int = Path(..., description="The ID of the experience to update"),
    service: ExperienceService = Depends(get_experience_service)
):
    """Update an existing experience."""
    return await service.update_experience(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_experience(
    id: int = Path(..., description="The ID of the experience to delete"),
    service: ExperienceService = Depends(get_experience_service)
):
    """Delete an experience and its associated achievements."""
    await service.delete_experience(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_experience(
    id: int = Path(..., description="The ID of the experience to cross-check"),
    service: ExperienceService = Depends(get_experience_service)
):
    """Validate date fields and company URL connectivity."""
    return await service.cross_check_experience(id)

# --- Achievement Details Endpoints ---

@router.post("/achievements", response_model=ExperienceAchievementResponse, status_code=status.HTTP_201_CREATED)
async def add_experience_achievement(
    data: ExperienceAchievementCreate,
    service: ExperienceService = Depends(get_experience_service)
):
    """Add an achievement detail statement to an experience."""
    return await service.add_achievement(data)

@router.delete("/achievements/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_experience_achievement(
    id: int = Path(..., description="The ID of the achievement statement to delete"),
    service: ExperienceService = Depends(get_experience_service)
):
    """Delete an achievement detail statement."""
    await service.delete_achievement(id)
