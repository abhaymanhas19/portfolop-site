"""FastAPI router for Achievement CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.achievement import AchievementRepository
from app.services.achievement import AchievementService
from app.schemas.achievement import AchievementResponse, AchievementCreate, AchievementUpdate

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"]
)

def get_achievement_service(session: AsyncSession = Depends(get_async_session)) -> AchievementService:
    repository = AchievementRepository(session)
    return AchievementService(repository)

@router.get("/", response_model=List[AchievementResponse])
async def list_achievements(service: AchievementService = Depends(get_achievement_service)):
    """Retrieve all achievements."""
    return await service.get_all_achievements()

@router.get("/{id}", response_model=AchievementResponse)
async def get_achievement(
    id: int = Path(..., description="The ID of the achievement"),
    service: AchievementService = Depends(get_achievement_service)
):
    """Retrieve details for a single achievement by ID."""
    return await service.get_achievement_by_id(id)

@router.post("/", response_model=AchievementResponse, status_code=status.HTTP_201_CREATED)
async def create_achievement(
    data: AchievementCreate,
    service: AchievementService = Depends(get_achievement_service)
):
    """Create a new achievement."""
    return await service.create_achievement(data)

@router.put("/{id}", response_model=AchievementResponse)
async def update_achievement(
    data: AchievementUpdate,
    id: int = Path(..., description="The ID of the achievement to update"),
    service: AchievementService = Depends(get_achievement_service)
):
    """Update an existing achievement."""
    return await service.update_achievement(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_achievement(
    id: int = Path(..., description="The ID of the achievement to delete"),
    service: AchievementService = Depends(get_achievement_service)
):
    """Delete an achievement."""
    await service.delete_achievement(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_achievement(
    id: int = Path(..., description="The ID of the achievement to cross-check"),
    service: AchievementService = Depends(get_achievement_service)
):
    """Perform reachability checks on credentialUrl and badgeImage URLs."""
    return await service.cross_check_achievement(id)
