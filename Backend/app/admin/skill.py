"""SQLAdmin views for skill models."""

from sqladmin import ModelView

from app.models.skill import Skill, SkillCategory


class SkillCategoryAdmin(ModelView, model=SkillCategory):
    name = "Skill Category"
    name_plural = "Skill Categories"
    column_list = [
        SkillCategory.id,
        SkillCategory.category_id,
        SkillCategory.label,
    ]


class SkillAdmin(ModelView, model=Skill):
    name = "Skill"
    name_plural = "Skills"
    column_list = [
        Skill.id,
        Skill.name,
        Skill.level,
        Skill.category_id,
    ]
