from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..database import get_session
from ..models import (
    SkillCategory, Skill, Project, Achievement, 
    Experience, ExperienceAchievement, AboutProfile, AboutTile, ValueStatement,
    ProductProfile, ProductCarousel, ProductImage, Blog
)

router = APIRouter()

@router.get("/")
def get_portfolio(session: Session = Depends(get_session)):
    # Skills
    categories = session.exec(select(SkillCategory)).all()
    skills_data = []
    for cat in categories:
        cat_dict = cat.model_dump()
        cat_dict["skills"] = session.exec(select(Skill).where(Skill.category_id == cat.id)).all()
        skills_data.append(cat_dict)

    # Projects
    projects = session.exec(select(Project)).all()
    projects_list = []
    for p in projects:
        p_dict = p.model_dump()
        p_dict["tags"] = [t.strip() for t in p.tags.split(",")] if p.tags else []
        projects_list.append(p_dict)

    # Achievements
    achievements = session.exec(select(Achievement)).all()

    # About
    about_profile = session.exec(select(AboutProfile)).first()
    about_tiles = session.exec(select(AboutTile)).all()
    experience = session.exec(select(Experience)).all()
    exp_list = []
    for e in experience:
        e_dict = e.model_dump()
        e_dict["achievements"] = [a.content for a in session.exec(select(ExperienceAchievement).where(ExperienceAchievement.experience_id == e.id)).all()]
        exp_list.append(e_dict)
    values = session.exec(select(ValueStatement)).all()

    # Products (Gallery)
    product_profile = session.exec(select(ProductProfile)).first()
    product_carousels = session.exec(select(ProductCarousel)).all()
    product_images = session.exec(select(ProductImage)).all()

    # Blogs
    blogs = session.exec(select(Blog)).all()
    blogs_list = []
    for b in blogs:
        b_dict = b.model_dump()
        b_dict["tags"] = [t.strip() for t in b.tags.split(",")] if b.tags else []
        blogs_list.append(b_dict)

    return {
        "skills": {"categories": skills_data},
        "projects": {"featured": projects_list},
        "achievements": {"certifications": achievements},
        "about": {
            "headline": about_profile.headline if about_profile else "",
            "intro": about_profile.intro if about_profile else "",
            "profile": about_profile.model_dump() if about_profile else {},
            "tiles": about_tiles,
            "experience": exp_list,
            "values": values
        },
        "gallery": {
            "profile": product_profile.model_dump() if product_profile else {},
            "carousel": product_carousels,
            "images": product_images
        },
        "blogs": blogs_list
    }
