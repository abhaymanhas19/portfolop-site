import sys
import os
from sqlmodel import Session, create_engine, select

# Add Backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.models import (
    SkillCategory, Skill,
    Project, Achievement, Experience, ExperienceAchievement,
    AboutProfile, AboutTile, ValueStatement, ProductProfile,
    ProductCarousel, ProductImage, Blog
)
from app.database import DATABASE_URL

engine = create_engine(DATABASE_URL)

def migrate():
    with Session(engine) as session:
        # Check if already migrated
        if session.exec(select(SkillCategory)).first():
            print("Data already migrated.")
            return

        # 1. Skills
        skills_data = [
            {
                "id": 'backend',
                "label": 'Backend Engineering',
                "icon": 'ServerCog',
                "summary": 'Event-driven Python services with robust APIs, websockets, and background workers that stay performant under load.',
                "image": '',
                "accent": 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]/80',
                "tint": 'bg-cyan-500/10',
                "skills": [
                    {"name": 'Python', "level": 95, "highlight": 'AsyncIO, typing, profiling'},
                    {"name": 'Django + DRF', "level": 92, "highlight": 'Schema-first APIs, multi-tenant auth'},
                    {"name": 'Django Channels', "level": 88, "highlight": 'Realtime dashboards & collab suites'},
                    {"name": 'Asynchronous Programming', "level": 90, "highlight": 'AsyncIO'},
                    {"name": 'Celery', "level": 90, "highlight": 'Task orchestration & monitoring'},
                    {"name": 'PostgreSQL', "level": 86, "highlight": 'Query tuning & migration strategy'},
                    {"name": 'NumPy', "level": 82, "highlight": 'Numerical computing & vectorization'},
                    {"name": 'Pandas', "level": 84, "highlight": 'Data wrangling & analytics'},
                ]
            },
            {
                "id": 'aiml',
                "label": 'AI & ML Systems',
                "icon": 'BrainCircuit',
                "summary": 'Applied ML stacks that pair evaluation harnesses with resilient serving for copilots, chatbots, and document intelligence.',
                "image": '',
                "accent": 'from-emerald-100 via-teal-100 to-white',
                "tint": 'bg-teal-500/10',
                "skills": [
                    {"name": 'PyTorch + Scikit-Learn', "level": 82, "highlight": 'Modeling, training loops, pipelines'},
                    {"name": 'Hugging Face', "level": 80, "highlight": 'Model hub & inference tooling'},
                    {"name": 'Transformers', "level": 84, "highlight": 'Attention models & fine-tuning'},
                    {"name": 'Linear Regression', "level": 78, "highlight": 'Baseline modeling & explainability'},
                    {"name": 'Classification', "level": 80, "highlight": 'Supervised learning & metrics'},
                    {"name": 'Model Training', "level": 85, "highlight": 'Forward pass, loss, backprop, optimizers'},
                    {"name": 'RAG Pipelines', "level": 91, "highlight": 'Hybrid search, reranking, evaluation'},
                    {"name": 'MCP Servers', "level": 91, "highlight": 'Actions using LLM'},
                    {"name": 'LLM APIs (OpenAI, Azure, Gemini)', "level": 89, "highlight": 'Cost-aware orchestration'},
                    {"name": 'AI Unified Platforms (OpenRouter, LangChain)', "level": 84, "highlight": 'Tooling & guardrails'},
                    {"name": 'Model Evaluation', "level": 88, "highlight": 'Offline + automated reporting'},
                    {"name": 'Azure OpenAI', "level": 88, "highlight": 'Model deployment & safety'},
                ]
            },
            {
                "id": 'devops',
                "label": 'Cloud & DevOps',
                "icon": 'Cloud',
                "summary": 'Container-native platforms with observability baked in so releases stay repeatable and rollbacks become rare.',
                "image": '',
                "accent": 'from-sky-100 via-blue-100 to-white',
                "tint": 'bg-blue-500/10',
                "skills": [
                    {"name": 'AWS, AZURE, GCP', "level": 90, "highlight": 'Hosting servers'},
                    {"name": 'Docker & Compose', "level": 90, "highlight": 'Local parity & developer experience'},
                    {"name": 'Kubernetes (Azure Kubernetes Service)', "level": 84, "highlight": 'Scalable workloads & GitOps'},
                    {"name": 'Git, GitHub, Azure DevOps', "level": 88, "highlight": 'Version control systems'},
                    {"name": 'CI/CD Pipelines (GitHub Actions, Jenkins)', "level": 88, "highlight": 'Build, test, and release automation'},
                ]
            }
        ]

        for cat_data in skills_data:
            cat = SkillCategory(
                category_id=cat_data["id"],
                label=cat_data["label"],
                icon=cat_data["icon"],
                summary=cat_data["summary"],
                image=cat_data["image"],
                accent=cat_data["accent"],
                tint=cat_data["tint"]
            )
            session.add(cat)
            session.commit()
            session.refresh(cat)
            
            for s_data in cat_data["skills"]:
                s = Skill(
                    name=s_data["name"],
                    level=s_data["level"],
                    highlight=s_data.get("highlight"),
                    description=s_data.get("description"),
                    category_id=cat.id
                )
                session.add(s)

        # 2. Projects
        projects_data = [
            {
                "slug": 'ailyze-qualitative-insights',
                "title": 'AILYZE — Qualitative Analysis Copilot',
                "summary": 'Multi-agent interviewer and document insight lab supporting 20+ languages.',
                "description": 'AILYZE is an online qualitative analysis platform...',
                "tags": 'Python,Django,Celery,WebSockets,Azure OpenAI,PostgreSQL',
                "image": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758566179/ailyze_spnxi7.png',
                "backdrop": '',
                "demo": 'https://www.ailyze.com',
                "category": 'AI Platform',
            },
            {
                "slug": 'chds-food-service',
                "title": 'CHDS — Healthy Meal Ordering',
                "summary": 'End-to-end ordering with subscription nutrition plans and Stripe billing.',
                "description": 'CHDS.com.au provides fresh, balanced meals across rotating menus.',
                "tags": 'Python,Django,Stripe,Redis',
                "image": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565860/Screenshot_from_2025-09-23_00-00-44_yhk2hv.png',
                "backdrop": '',
                "demo": 'https://chds.com.au',
                "category": 'Realtime Apps',
            }
        ]
        for p_data in projects_data:
            session.add(Project(**p_data))

        # 3. Achievements
        ach_data = [
            {
                "title": 'Python Certified',
                "issuer": 'HackerRank',
                "year": '2022',
                "summary": 'Validated advanced Python knowledge...',
                "badgeImage": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219741/1711003166802_bmbwxr.jpg',
                "credentialUrl": 'https://shorturl.at/xSlfD',
                "category": 'Backend',
            }
        ]
        for a in ach_data: session.add(Achievement(**a))
        
        # 4. About
        about_profile = AboutProfile(
            tag="Profile Summary",
            heading="My Go-To Python & AI/ML Engineer",
            summary="Hi, I'm Abhay Manhas...",
            ending="Ready to collaborate?",
            headline="Python engineer delivering AI platforms that hold up in production",
            intro="I translate fuzzy ideas into reliable AI-driven products..."
        )
        session.add(about_profile)
        
        about_tiles = [
            AboutTile(title='Applied AI systems', description='Retrieval augmented generation...'),
            AboutTile(title='Resilient backends', description='Async Django architectures...'),
        ]
        for t in about_tiles: session.add(t)

        value_statements = [
            ValueStatement(title='Measure, then optimise', description='Anchor decisions in metrics...'),
        ]
        for v in value_statements: session.add(v)
        
        # 5. Experience
        exp_data = [
            {
                "role": 'Lead Python / AI Engineer',
                "company": 'Freelance & Consulting',
                "period": '2022 — Present',
                "summary": 'Partner with product leaders...',
                "link": 'https://www.upwork.com/freelancers/~0109aadeddb63e7a39?mp_source=share',
                "achievements": [
                    'Designed a hybrid-cloud LLM gateway...',
                    'Implemented a RAG service...',
                ]
            }
        ]
        for e_data in exp_data:
            achievs = e_data.pop("achievements")
            exp = Experience(**e_data)
            session.add(exp)
            session.commit()
            session.refresh(exp)
            for a_content in achievs:
                session.add(ExperienceAchievement(content=a_content, experience_id=exp.id))

        # 6. Products (Gallery)
        product_profile = ProductProfile(
            name='Abhay Manhas',
            tagline='AI/ML snapshots from the systems shipped into production.',
            image='https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565569/display_aivyvw.png',
            highlight='Model evaluation frames...',
            cta='View AI/ML Visuals'
        )
        session.add(product_profile)
        session.commit()
        session.refresh(product_profile)

        product_carousels = [
            ProductCarousel(media_type='video', src='...', alt='...', title='...', description='...', profile_id=product_profile.id),
        ]
        for pc in product_carousels: session.add(pc)

        # 7. Blogs
        blogs_data = [
            {
                "slug": "artificial-intelligence-evolution",
                "title": "What is Artificial Intelligence and how it evolved",
                "summary": "Evolution of Artificial Intelligence",
                "content": "...",
                "image": "...",
                "date": "January 28, 2026",
                "tags": "AI,Engineering",
                "author": "Abhay Manhas"
            }
        ]
        for b_data in blogs_data:
            session.add(Blog(**b_data))

        session.commit()
        print("Data migration complete.")

if __name__ == "__main__":
    migrate()
