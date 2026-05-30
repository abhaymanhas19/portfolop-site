"""FastAPI router for Project CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.project import ProjectRepository
from app.services.project import ProjectService
from app.schemas.project import (
    ProjectResponse, ProjectListResponse, ProjectCreate, ProjectUpdate,
    ProjectImageResponse, ProjectImageCreate
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

def get_project_service(session: AsyncSession = Depends(get_async_session)) -> ProjectService:
    repository = ProjectRepository(session)
    return ProjectService(repository)

@router.get("/", response_model=List[ProjectListResponse])
async def list_projects(service: ProjectService = Depends(get_project_service)):
    """Retrieve all projects (omitting heavy related images)."""
    return await service.get_all_projects()

@router.get("/{slug}", response_model=ProjectResponse)
async def get_project_by_slug(
    slug: str = Path(..., description="The unique slug of the project"),
    service: ProjectService = Depends(get_project_service)
):
    """Retrieve a single project along with its related images by slug."""
    return await service.get_project_by_slug(slug)

@router.get("/id/{id}", response_model=ProjectResponse)
async def get_project_by_id(
    id: int = Path(..., description="The database primary key ID of the project"),
    service: ProjectService = Depends(get_project_service)
):
    """Retrieve a single project along with its related images by database ID."""
    return await service.get_project_by_id(id)

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    data: ProjectCreate,
    service: ProjectService = Depends(get_project_service)
):
    """Create a new project."""
    return await service.create_project(data)

@router.put("/{id}", response_model=ProjectResponse)
async def update_project(
    data: ProjectUpdate,
    id: int = Path(..., description="The ID of the project to update"),
    service: ProjectService = Depends(get_project_service)
):
    """Update an existing project."""
    return await service.update_project(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    id: int = Path(..., description="The ID of the project to delete"),
    service: ProjectService = Depends(get_project_service)
):
    """Delete a project and all associated images."""
    await service.delete_project(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_project(
    id: int = Path(..., description="The ID of the project to cross-check"),
    service: ProjectService = Depends(get_project_service)
):
    """Verify demo URL, repo URL, backdrop, and associated image links."""
    return await service.cross_check_project(id)

# --- Project Image Endpoints ---

@router.post("/images", response_model=ProjectImageResponse, status_code=status.HTTP_201_CREATED)
async def add_project_image(
    data: ProjectImageCreate,
    service: ProjectService = Depends(get_project_service)
):
    """Add an image to a project."""
    return await service.add_project_image(data)

@router.delete("/images/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project_image(
    id: int = Path(..., description="The ID of the project image to delete"),
    service: ProjectService = Depends(get_project_service)
):
    """Delete a project image."""
    await service.delete_project_image(id)
