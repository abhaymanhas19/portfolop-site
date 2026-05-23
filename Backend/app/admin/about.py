"""SQLAdmin views for experience / about models."""

from sqladmin import ModelView

from app.models.about import Experience, ExperienceAchievement


class ExperienceAdmin(ModelView, model=Experience):
    name = "Experience"
    name_plural = "Experiences"
    column_list = [
        Experience.id,
        Experience.job_title,
        Experience.company_name,
        Experience.start_date,
        Experience.end_date,
    ]


class ExperienceAchievementAdmin(ModelView, model=ExperienceAchievement):
    name = "Experience Achievement"
    name_plural = "Experience Achievements"
    column_list = [
        ExperienceAchievement.id,
        ExperienceAchievement.experience_id,
        ExperienceAchievement.content,
    ]
