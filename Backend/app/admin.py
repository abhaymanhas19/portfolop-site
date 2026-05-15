from sqladmin import ModelView
from app.models import (
    SkillCategory, Skill,
    Project, ProjectImage, Achievement,
    Experience, ExperienceAchievement,
    AboutTile, ValueStatement,
    ProductProfile, ProductCarousel, ProductImage,
    Blog, BlogImage,
    SocialLink
)
from wtforms import FileField
from starlette.requests import Request

class SkillCategoryAdmin(ModelView, model=SkillCategory):
    column_list = [SkillCategory.id, SkillCategory.label]

class SkillAdmin(ModelView, model=Skill):
    column_list = [Skill.id, Skill.name, Skill.category_id]

class ProjectAdmin(ModelView, model=Project):
    column_list = [Project.id, Project.title, Project.category]

class AchievementAdmin(ModelView, model=Achievement):
    column_list = [Achievement.id, Achievement.title, Achievement.issuer]

class ExperienceAdmin(ModelView, model=Experience):
    column_list = [Experience.id, Experience.job_title, Experience.company_name]

class ProductProfileAdmin(ModelView, model=ProductProfile):
    column_list = [ProductProfile.id, ProductProfile.name]

class BlogAdmin(ModelView, model=Blog):
    column_list = [Blog.id, Blog.title, Blog.date]

class BlogImageAdmin(ModelView, model=BlogImage):
    column_list = [BlogImage.id, BlogImage.blog_id, BlogImage.image_url]
    form_overrides = {"image_url": FileField}

    async def on_model_change(self, data: dict, model: any, is_created: bool, request: Request) -> None:
        file_obj = data.get("image_url")
        if file_obj and hasattr(file_obj, "filename") and file_obj.filename:
            upload_result = cloudinary_uploader(file_obj)
            data["image_url"] = upload_result.get("secure_url")
        elif not is_created and model.image_url:
            data["image_url"] = model.image_url
        else:
            data["image_url"] = ""

class ProjectImageAdmin(ModelView, model=ProjectImage):
    column_list = [ProjectImage.id, ProjectImage.project_id, ProjectImage.image_url]
    form_overrides = {"image_url": FileField}

    async def on_model_change(self, data: dict, model: any, is_created: bool, request: Request) -> None:
        file_obj = data.get("image_url")
        if file_obj and hasattr(file_obj, "filename") and file_obj.filename:
            upload_result = cloudinary_uploader(file_obj)
            data["image_url"] = upload_result.get("secure_url")
        elif not is_created and model.image_url:
            data["image_url"] = model.image_url
        else:
            data["image_url"] = ""

class ExperienceAchievementAdmin(ModelView, model=ExperienceAchievement):
    column_list = [ExperienceAchievement.id, ExperienceAchievement.content, ExperienceAchievement.experience_id]

class AboutTileAdmin(ModelView, model=AboutTile):
    column_list = [AboutTile.id, AboutTile.title]

class ValueStatementAdmin(ModelView, model=ValueStatement):
    column_list = [ValueStatement.id, ValueStatement.title]

class ProductCarouselAdmin(ModelView, model=ProductCarousel):
    column_list = [ProductCarousel.id, ProductCarousel.title]

class ProductImageAdmin(ModelView, model=ProductImage):
    column_list = [ProductImage.id, ProductImage.src]

class SocialLinkAdmin(ModelView, model=SocialLink):
    column_list = [SocialLink.id, SocialLink.platform, SocialLink.url]

def register_admin(admin):
    admin.add_view(SkillCategoryAdmin)
    admin.add_view(SkillAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(AchievementAdmin)
    admin.add_view(ExperienceAdmin)
    admin.add_view(ProductProfileAdmin)
    admin.add_view(BlogAdmin)
    admin.add_view(BlogImageAdmin)
    admin.add_view(ProjectImageAdmin)
    admin.add_view(ExperienceAchievementAdmin)
    admin.add_view(AboutTileAdmin)
    admin.add_view(ValueStatementAdmin)
    admin.add_view(ProductCarouselAdmin)
    admin.add_view(ProductImageAdmin)
    admin.add_view(SocialLinkAdmin)
