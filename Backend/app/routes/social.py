"""FastAPI router for SocialLink CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.social import SocialLinkRepository
from app.services.social import SocialLinkService
from app.schemas.social import SocialLinkResponse, SocialLinkCreate, SocialLinkUpdate

router = APIRouter(
    prefix="/socials",
    tags=["Social Links"]
)

def get_social_service(session: AsyncSession = Depends(get_async_session)) -> SocialLinkService:
    repository = SocialLinkRepository(session)
    return SocialLinkService(repository)

@router.get("/", response_model=List[SocialLinkResponse])
async def list_social_links(service: SocialLinkService = Depends(get_social_service)):
    """Retrieve all social links."""
    return await service.get_all_links()

@router.get("/{id}", response_model=SocialLinkResponse)
async def get_social_link(
    id: int = Path(..., description="The ID of the social link"),
    service: SocialLinkService = Depends(get_social_service)
):
    """Retrieve details for a single social link by ID."""
    return await service.get_link_by_id(id)

@router.post("/", response_model=SocialLinkResponse, status_code=status.HTTP_201_CREATED)
async def create_social_link(
    data: SocialLinkCreate,
    service: SocialLinkService = Depends(get_social_service)
):
    """Create a new social link."""
    return await service.create_link(data)

@router.put("/{id}", response_model=SocialLinkResponse)
async def update_social_link(
    data: SocialLinkUpdate,
    id: int = Path(..., description="The ID of the social link to update"),
    service: SocialLinkService = Depends(get_social_service)
):
    """Update an existing social link."""
    return await service.update_link(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_social_link(
    id: int = Path(..., description="The ID of the social link to delete"),
    service: SocialLinkService = Depends(get_social_service)
):
    """Delete a social link."""
    await service.delete_link(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_social_link(
    id: int = Path(..., description="The ID of the social link to cross-check"),
    service: SocialLinkService = Depends(get_social_service)
):
    """Validate external social profile URL accessibility."""
    return await service.cross_check_link(id)
