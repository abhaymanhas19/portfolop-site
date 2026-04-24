from sqladmin import ModelView
from app.models import (
    SkillCategory, Skill,
    Project, Achievement,
    Experience, ExperienceAchievement,
    AboutProfile, AboutTile, ValueStatement,
    ProductProfile, ProductCarousel, ProductImage,
    Blog
)

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

def register_admin(admin):
    admin.add_view(SkillCategoryAdmin)
    admin.add_view(SkillAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(AchievementAdmin)
    admin.add_view(ExperienceAdmin)
    admin.add_view(AboutProfileAdmin)
    admin.add_view(ProductProfileAdmin)
    admin.add_view(BlogAdmin)
    admin.add_view(ExperienceAchievement)
    admin.add_view(AboutTile)
    admin.add_view(ValueStatement)
    admin.add_view(ProductCarousel)
    admin.add_view(ProductImage)
