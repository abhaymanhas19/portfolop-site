"""SQLAdmin views for achievement models."""

from sqladmin import ModelView

from app.models.achievement import Achievement


class AchievementAdmin(ModelView, model=Achievement):
    name = "Achievement"
    name_plural = "Achievements"
    column_list = [
        Achievement.id,
        Achievement.title,
        Achievement.issuer,
        Achievement.year,
        Achievement.category,
    ]
