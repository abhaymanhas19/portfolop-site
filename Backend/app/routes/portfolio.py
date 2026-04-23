    LogoLoopItem, Blog
)

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])

@router.get("/")
async def get_full_portfolio(session: Session = Depends(get_session)):
    branding = session.exec(select(Branding)).first()
    socials = session.exec(select(Social)).all()
    hero = session.exec(select(Hero)).first()
    hero_stats = session.exec(select(HeroStat)).all()
    skill_categories = session.exec(select(SkillCategory)).all()
    projects = session.exec(select(Project)).all()
    achievements = session.exec(select(Achievement)).all()
    experience = session.exec(select(Experience)).all()
    about_profile = session.exec(select(AboutProfile)).first()
    about_tiles = session.exec(select(AboutTile)).all()
    values = session.exec(select(ValueStatement)).all()
    gallery_profile = session.exec(select(GalleryProfile)).first()
    gallery_carousel = session.exec(select(GalleryCarousel)).all()
    gallery_images = session.exec(select(GalleryImage)).all()
    logo_loop = session.exec(select(LogoLoopItem)).all()
    blogs = session.exec(select(Blog)).all()

    return {
        "branding": branding,
        "socials": socials,
        "hero": {
            **(hero.dict() if hero else {}),
            "stats": hero_stats
        },
        "skills": {
            "categories": [
                {
                    **cat.dict(),
                    "skills": [s for s in cat.skills]
                } for cat in skill_categories
            ]
        },
        "projects": {
            "featured": [
                {**p.dict(), "tags": p.tags.split(",") if p.tags else []} for p in projects
            ]
        },
        "achievements": {
            "certifications": achievements
        },
        "blogs": [
            {**b.dict(), "tags": b.tags.split(",") if b.tags else []} for b in blogs
        ],
        "about": {
            **(about_profile.dict() if about_profile else {}),
            "profile": about_profile,
            "tiles": about_tiles,
            "experience": [
                {
                    **exp.dict(),
                    "achievements": [a.content for a in exp.achievements]
                } for exp in experience
            ],
            "values": values
        },
        "gallery": {
            "profile": gallery_profile,
            "carousel": [
                {**c.dict(), "type": c.media_type} for c in gallery_carousel
            ],
            "images": gallery_images
        },
        "logoLoop": {
            "items": logo_loop
        }
    }
