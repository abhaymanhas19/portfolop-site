"""Repository layer for Project and ProjectImage database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project, ProjectImage

class ProjectRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self) -> List[Project]:
        """Fetch all projects along with related images."""
        result = await self.session.execute(
            select(Project).options(selectinload(Project.images))
        )
        return list(result.scalars().all())

    async def get_by_id(self, project_id: int) -> Optional[Project]:
        """Fetch a single project by database ID."""
        result = await self.session.execute(
            select(Project).where(Project.id == project_id).options(selectinload(Project.images))
        )
        return result.scalars().first()

    async def get_by_slug(self, slug: str) -> Optional[Project]:
        """Fetch a single project by its unique slug."""
        result = await self.session.execute(
            select(Project).where(Project.slug == slug).options(selectinload(Project.images))
        )
        return result.scalars().first()

    async def create(self, project: Project) -> Project:
        """Create a new project."""
        self.session.add(project)
        await self.session.commit()
        await self.session.refresh(project)
        return project

    async def update(self, project: Project) -> Project:
        """Update an existing project."""
        self.session.add(project)
        await self.session.commit()
        await self.session.refresh(project)
        return project

    async def delete(self, project: Project) -> None:
        """Delete a project."""
        await self.session.delete(project)
        await self.session.commit()

    async def get_image_by_id(self, image_id: int) -> Optional[ProjectImage]:
        """Fetch a project image by ID."""
        result = await self.session.execute(
            select(ProjectImage).where(ProjectImage.id == image_id)
        )
        return result.scalars().first()

    async def create_image(self, image: ProjectImage) -> ProjectImage:
        """Add an image to a project."""
        self.session.add(image)
        await self.session.commit()
        await self.session.refresh(image)
        return image

    async def delete_image(self, image: ProjectImage) -> None:
        """Delete a project image."""
        await self.session.delete(image)
        await self.session.commit()
