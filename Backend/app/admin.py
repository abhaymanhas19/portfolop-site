from sqladmin import Admin, ModelView
from .models import (
    Branding, Social, Hero, HeroStat, SkillCategory, Skill,
    Project, Achievement, Experience, AboutProfile, AboutTile,
    ValueStatement, GalleryProfile, GalleryCarousel, GalleryImage,
    LogoLoopItem, Blog
)

def setup_admin(app, engine):
    admin = Admin(app, engine)
    
    class BlogAdmin(ModelView, model=Blog):
        column_list = [Blog.id, Blog.title, Blog.date]

    admin.add_view(BlogAdmin)
    
    class BrandingAdmin(ModelView, model=Branding):
        column_list = [Branding.id, Branding.name, Branding.role]
    
    class SocialAdmin(ModelView, model=Social):
        column_list = [Social.id, Social.label, Social.url]
        
    class HeroAdmin(ModelView, model=Hero):
        column_list = [Hero.id, Hero.title]
        
    class HeroStatAdmin(ModelView, model=HeroStat):
        column_list = [HeroStat.id, HeroStat.label, HeroStat.value]
        
    class SkillCategoryAdmin(ModelView, model=SkillCategory):
        column_list = [SkillCategory.id, SkillCategory.label]
        
    class SkillAdmin(ModelView, model=Skill):
        column_list = [Skill.id, Skill.name, Skill.level]
        
    class ProjectAdmin(ModelView, model=Project):
        column_list = [Project.id, Project.title, Project.category]
        
    class AchievementAdmin(ModelView, model=Achievement):
        column_list = [Achievement.id, Achievement.title, Achievement.issuer]
        
    class ExperienceAdmin(ModelView, model=Experience):
        column_list = [Experience.id, Experience.role, Experience.company]
        
    class AboutProfileAdmin(ModelView, model=AboutProfile):
        column_list = [AboutProfile.id, AboutProfile.heading]
        
    class AboutTileAdmin(ModelView, model=AboutTile):
        column_list = [AboutTile.id, AboutTile.title]
        
    class ValueStatementAdmin(ModelView, model=ValueStatement):
        column_list = [ValueStatement.id, ValueStatement.title]
        
    class GalleryProfileAdmin(ModelView, model=GalleryProfile):
        column_list = [GalleryProfile.id, GalleryProfile.name]
        
    class GalleryCarouselAdmin(ModelView, model=GalleryCarousel):
        column_list = [GalleryCarousel.id, GalleryCarousel.title, GalleryCarousel.media_type]
        
    class GalleryImageAdmin(ModelView, model=GalleryImage):
        column_list = [GalleryImage.id, GalleryImage.title, GalleryImage.location]
        
    class LogoLoopItemAdmin(ModelView, model=LogoLoopItem):
        column_list = [LogoLoopItem.id, LogoLoopItem.label]

    admin.add_view(BrandingAdmin)
    admin.add_view(SocialAdmin)
    admin.add_view(HeroAdmin)
    admin.add_view(HeroStatAdmin)
    admin.add_view(SkillCategoryAdmin)
    admin.add_view(SkillAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(AchievementAdmin)
    admin.add_view(ExperienceAdmin)
    admin.add_view(AboutProfileAdmin)
    admin.add_view(AboutTileAdmin)
    admin.add_view(ValueStatementAdmin)
    admin.add_view(GalleryProfileAdmin)
    admin.add_view(GalleryCarouselAdmin)
    admin.add_view(GalleryImageAdmin)
    admin.add_view(LogoLoopItemAdmin)
    
    return admin
