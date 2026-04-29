from sqladmin import ModelView
from app.models import (
    SkillCategory, Skill,
    Project, Achievement,
    Experience, ExperienceAchievement,
    AboutProfile, AboutTile, ValueStatement,
    ProductProfile, ProductCarousel, ProductImage,
    Blog, BlogImage
)
from wtforms import FileField
import cloudinary
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
    column_list = [Experience.id, Experience.role, Experience.company]

class AboutProfileAdmin(ModelView, model=AboutProfile):
    column_list = [AboutProfile.id, AboutProfile.heading]

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
            file_bytes = await file_obj.read()
            upload_result = cloudinary.uploader.upload(file_bytes)
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

def register_admin(admin):
    admin.add_view(SkillCategoryAdmin)
    admin.add_view(SkillAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(AchievementAdmin)
    admin.add_view(ExperienceAdmin)
    admin.add_view(AboutProfileAdmin)
    admin.add_view(ProductProfileAdmin)
    admin.add_view(BlogAdmin)
    admin.add_view(BlogImageAdmin)
    admin.add_view(ExperienceAchievementAdmin)
    admin.add_view(AboutTileAdmin)
    admin.add_view(ValueStatementAdmin)
    admin.add_view(ProductCarouselAdmin)
    admin.add_view(ProductImageAdmin)
