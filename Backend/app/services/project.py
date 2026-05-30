"""Service layer for Project and ProjectImage operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.project import ProjectRepository
from app.models.project import Project, ProjectImage
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectImageCreate

logger = logging.getLogger(__name__)

class ProjectService:
    def __init__(self, repository: ProjectRepository) -> None:
        self.repository = repository

    async def get_all_projects(self) -> List[Project]:
        """Fetch all projects."""
        return await self.repository.get_all()

    async def get_project_by_id(self, project_id: int) -> Project:
        """Fetch project by ID, raising an error if not found."""
        project = await self.repository.get_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail=f"Project with ID {project_id} not found")
        return project

    async def get_project_by_slug(self, slug: str) -> Project:
        """Fetch project by slug, raising an error if not found."""
        project = await self.repository.get_by_slug(slug)
        if not project:
            raise HTTPException(status_code=404, detail=f"Project with slug '{slug}' not found")
        return project

    async def create_project(self, data: ProjectCreate) -> Project:
        """Create a new project after verifying that the slug is unique."""
        existing = await self.repository.get_by_slug(data.slug)
        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Project with slug '{data.slug}' already exists."
            )
        project = Project(**data.model_dump())
        return await self.repository.create(project)

    async def update_project(self, project_id: int, data: ProjectUpdate) -> Project:
        """Update an existing project, checking slug uniqueness if updated."""
        project = await self.get_project_by_id(project_id)
        update_dict = data.model_dump(exclude_unset=True)

        if "slug" in update_dict and update_dict["slug"] != project.slug:
            existing = await self.repository.get_by_slug(update_dict["slug"])
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail=f"Project with slug '{update_dict['slug']}' already exists."
                )

        for key, value in update_dict.items():
            setattr(project, key, value)

        return await self.repository.update(project)

    async def delete_project(self, project_id: int) -> None:
        """Delete a project along with its related images."""
        project = await self.get_project_by_id(project_id)
        
        # Explicitly delete associated images first if any cascades are not configured
        for image in list(project.images):
            await self.repository.delete_image(image)
            
        await self.repository.delete(project)

    async def add_project_image(self, data: ProjectImageCreate) -> ProjectImage:
        """Add an image to a project, verifying the project exists."""
        if data.project_id is not None:
            await self.get_project_by_id(data.project_id)
        image = ProjectImage(**data.model_dump())
        return await self.repository.create_image(image)

    async def delete_project_image(self, image_id: int) -> None:
        """Delete an image from a project."""
        image = await self.repository.get_image_by_id(image_id)
        if not image:
            raise HTTPException(status_code=404, detail=f"Project image with ID {image_id} not found")
        await self.repository.delete_image(image)

    async def cross_check_project(self, project_id: int) -> Dict[str, Any]:
        """Verify project link reachability and media assets validity."""
        project = await self.get_project_by_id(project_id)
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
                            # Try GET in case HEAD is blocked
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
                checks[label] = "Skipped (Relative or Invalid Protocol)"

        # Check Repository, Demo, Backdrop and Project Images URLs
        await check_url(project.repo_url, "Repository URL")
        await check_url(project.demo_url, "Demo URL")
        await check_url(project.backdrop, "Backdrop Image URL")

        # Check multiple images URLs
        images_status = []
        for i, img in enumerate(project.images):
            img_label = f"Image #{i+1} (ID: {img.id})"
            await check_url(img.image_url, img_label)
            images_status.append({"id": img.id, "url": img.image_url, "status": checks[img_label]})

        checks["total_images_checked"] = len(project.images)

        return {
            "entity": "Project",
            "entity_id": project_id,
            "project_title": project.title,
            "project_slug": project.slug,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "images_detail": images_status,
            "issues": issues
        }
