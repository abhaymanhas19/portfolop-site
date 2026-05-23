"""SQLAdmin views for project models."""

from sqladmin import ModelView

from app.admin.mixins import CloudinaryImageUploadMixin
from app.models.project import Project, ProjectImage


class ProjectAdmin(ModelView, model=Project):
    name = "Project"
    name_plural = "Projects"
    column_list = [
        Project.id,
        Project.slug,
        Project.title,
        Project.category,
    ]


class ProjectImageAdmin(CloudinaryImageUploadMixin, ModelView, model=ProjectImage):
    name = "Project Image"
    name_plural = "Project Images"
    column_list = [
        ProjectImage.id,
        ProjectImage.project_id,
        ProjectImage.image_url,
    ]
