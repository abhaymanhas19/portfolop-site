"""SQLAdmin views for social link models."""

from sqladmin import ModelView

from app.models.social import SocialLink


class SocialLinkAdmin(ModelView, model=SocialLink):
    name = "Social Link"
    name_plural = "Social Links"
    column_list = [
        SocialLink.id,
        SocialLink.platform,
        SocialLink.url,
    ]
