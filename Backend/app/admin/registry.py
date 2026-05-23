"""Central registration of all SQLAdmin model views."""

from sqladmin import Admin

from app.admin.about import ExperienceAchievementAdmin, ExperienceAdmin
from app.admin.achievement import AchievementAdmin
from app.admin.blog import BlogAdmin, BlogImageAdmin
from app.admin.product import ProductCarouselAdmin, ProductImageAdmin, ProductProfileAdmin
from app.admin.project import ProjectAdmin, ProjectImageAdmin
from app.admin.skill import SkillAdmin, SkillCategoryAdmin
from app.admin.social import SocialLinkAdmin

ADMIN_VIEWS: tuple[type, ...] = (
    SkillCategoryAdmin,
    SkillAdmin,
    ProjectAdmin,
    ProjectImageAdmin,
    AchievementAdmin,
    ExperienceAdmin,
    ExperienceAchievementAdmin,
    ProductProfileAdmin,
    ProductCarouselAdmin,
    ProductImageAdmin,
    BlogAdmin,
    BlogImageAdmin,
    SocialLinkAdmin,
)


def register_admin(admin: Admin) -> None:
    """Attach all model views to the SQLAdmin instance."""
    for view in ADMIN_VIEWS:
        admin.add_view(view)
