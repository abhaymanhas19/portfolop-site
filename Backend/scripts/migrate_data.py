import sys
import os
from sqlmodel import Session, create_engine, select

# Add Backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.models import (
    Branding, Social, Hero, HeroStat, SkillCategory, Skill,
    Project, Achievement, Experience, ExperienceAchievement,
    AboutProfile, AboutTile, ValueStatement, GalleryProfile,
    GalleryCarousel, GalleryImage, LogoLoopItem, Blog
)
from app.database import DATABASE_URL

engine = create_engine(DATABASE_URL)

def migrate():
    with Session(engine) as session:
        # Check if already migrated
        if session.exec(select(Branding)).first():
            print("Data already migrated.")
            return

        # 1. Branding
        branding = Branding(
            name='Abhay Manhas',
            role='Full-Stack Developer & AI Engineer',
            tagline='Building AI-first backends with Python, RAG, and realtime systems.',
            location='Pathankot, Punjab, India',
            contactEmail='abhayramgarhia19@outlook.com',
            resumePath='/cv.pdf',
            avatar='https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565569/display_aivyvw.png'
        )
        session.add(branding)

        # 2. Socials
        socials = [
            Social(social_id='github', label='GitHub', icon='Github', url='https://github.com/abhaymanhas19'),
            Social(social_id='linkedin', label='LinkedIn', icon='Linkedin', url='https://www.linkedin.com/in/abhaymanhas19'),
            Social(social_id='instagram', label='Instagram', icon='Instagram', url='https://www.instagram.com/abhaymanhas19'),
            Social(social_id='x', label='X', icon='Twitter', url='https://x.com/abhaymanhas_19'),
        ]
        for s in socials: session.add(s)

        # 3. Hero
        hero = Hero(
            eyebrow='Available to Work',
            title='Abhay Manhas',
            highlight='Python & AI/ML Engineer',
            description='As a Python & AI/ML expert, I build scalable web apps, intelligent models, and automation tools that drive growth.',
            detail="From custom ML algorithms to full-stack deployments, let's turn your vision into reality.",
            aiSummary='Partner with an engineer who blends ML strategy, backend architecture, and automation to ship results.',
            trustBadge='',
            primaryActionLabel='Contact for full-time / contract',
            primaryActionTo='/#contact',
            secondaryActionLabel='What I Can Offer',
            secondaryActionTo='/what-i-can-build'
        )
        session.add(hero)
        session.commit()
        session.refresh(hero)

        hero_stats = [
            HeroStat(label='Years Experience', value='4+', icon='BriefcaseBusiness', hero_id=hero.id),
            HeroStat(label='Clients Served', value='10+', icon='UsersRound', hero_id=hero.id),
            HeroStat(label='Companies Partnered', value='3+', icon='Building2', hero_id=hero.id),
        ]
        for hs in hero_stats: session.add(hs)

        # 4. Skills
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
            },
            {
                "id": 'pipelines',
                "label": 'Agentic Automation Workflow',
                "icon": 'Workflow',
                "summary": 'LLM-driven automations that connect tools, trigger actions, and streamline ops without heavy code.',
                "image": '',
                "accent": 'from-[#8ED9FF] via-[#C7B2FF] to-[#FFD1B3]',
                "tint": 'bg-indigo-500/10',
                "skills": [
                    {"name": 'Zapier', "level": 80, "highlight": 'No-code workflow automation'},
                    {"name": 'n8n', "level": 80, "highlight": 'Self-hosted automation builder'},
                    {"name": 'ChatGPT Agentic Builder', "level": 82, "highlight": 'LLM agent workflows'},
                ]
            },
            {
                "id": 'data-engineering',
                "label": 'Data Engineering & Monitoring',
                "icon": 'Layers',
                "summary": 'Queue-backed data infrastructure with storage, observability, and reliability signals that keep pipelines healthy.',
                "image": '',
                "accent": 'from-amber-100 via-orange-100 to-white',
                "tint": 'bg-amber-500/10',
                "skills": [
                    {"name": 'Redis', "level": 84, "highlight": 'Caching & ephemeral data'},
                    {"name": 'RabbitMQ', "level": 82, "highlight": 'Queue routing & delivery'},
                    {"name": 'Azure Blob Storage', "level": 80, "highlight": 'Object storage & archives'},
                    {"name": 'Message Queues', "level": 82, "highlight": 'Backpressure & async processing'},
                    {"name": 'Flower', "level": 78, "highlight": 'Celery monitoring & alerts'},
                ]
            },
            {
                "id": 'ai-agents',
                "label": 'AI Agents',
                "icon": 'Cpu',
                "summary": 'Tool-using agent orchestration for autonomous workflows and multi-step reasoning tasks.',
                "image": '',
                "accent": 'from-slate-100 via-sky-100 to-white',
                "tint": 'bg-slate-500/10',
                "skills": [
                    {"name": 'CrewAI', "level": 80, "highlight": 'Multi-agent coordination'},
                    {"name": 'OpenAI Agents SDK', "level": 82, "highlight": 'Tooling, planning, and execution'},
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

        # 5. Projects
        projects_data = [
            {
                "slug": 'ailyze-qualitative-insights',
                "title": 'AILYZE — Qualitative Analysis Copilot',
                "summary": 'Multi-agent interviewer and document insight lab supporting 20+ languages.',
                "description": 'AILYZE is an online qualitative analysis platform with an avatar interviewer that autonomously conducts interviews in 20+ languages while the advanced analysis workspace ingests docx/pdf/xlsx/csv research artefacts. The system generates thematic, content, and frequency studies, cross-segment analysis, and stakeholder-ready summaries in minutes.',
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
                "description": 'CHDS.com.au provides fresh, balanced meals across rotating menus. Customers browse curated plans, personalise dietary choices, and checkout via Stripe. The admin workspace supports menu scheduling, live order tracking, and nutrition tagging to keep the experience reliable for both chefs and customers.',
                "tags": 'Python,Django,Stripe,Redis',
                "image": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565860/Screenshot_from_2025-09-23_00-00-44_yhk2hv.png',
                "backdrop": '',
                "demo": 'https://chds.com.au',
                "category": 'Realtime Apps',
            },
            {
                "slug": 'document-rag-chatbot',
                "title": 'Document Reader RAG Chatbot',
                "summary": 'Secure document-to-answer assistant with hybrid retrieval and audit logging.',
                "description": 'Production-grade DRF backend for retrieval-augmented generation. Semantic chunking, hybrid vector/BM25 search, re-ranking, and context windows optimised for factuality. Includes user auth, roles, and audit logs. Handles docx, pdf, and xlsx sources with streaming responses.',
                "tags": 'Python,RAG,Server-Sent Events,PostgreSQL,Azure OpenAI',
                "image": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1758566203/Chatbot_vdriyv.png',
                "backdrop": '',
                "demo": 'https://ailyze.com/ai-chatbot',
                "category": 'AI Platform',
            }
        ]
        for p_data in projects_data:
            session.add(Project(**p_data))

        # 6. Achievements
        ach_data = [
            {
                "title": 'Python Certified',
                "issuer": 'HackerRank',
                "year": '2022',
                "summary": 'Validated advanced Python knowledge with focus on performance and clean design.',
                "badgeImage": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219741/1711003166802_bmbwxr.jpg',
                "credentialUrl": 'https://shorturl.at/xSlfD',
                "category": 'Backend',
            },
            {
                "title": 'Web Development Certified',
                "issuer": 'CNT Technologies',
                "year": '2023',
                "summary": 'Gained Experience to build Scalable and robust Web Services.',
                "badgeImage": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1768760229/Python-for-Web-Development-_njeq3k.webp',
                "credentialUrl": 'https://hostwebs.site/oQLPgx',
                "category": 'Backend',
            },
            {
                "title": 'CrewAI Certified',
                "issuer": 'CrewAI',
                "year": '2025',
                "summary": 'Operational playbooks for multi-agent AI architectures with context-aware routing.',
                "badgeImage": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219628/AutoGPT-vs-AgentGPT-Which-AI-Agent-Builder-is-Best-in-2025--31-_m5gcbs.png',
                "credentialUrl": 'https://shorturl.at/tKln2',
                "category": 'AI/ML',
            },
            {
                "title": 'KCNA — Kubernetes & Cloud Native Associate',
                "issuer": 'Cloud Native Computing Foundation',
                "year": '2024',
                "summary": 'Core Kubernetes concepts, observability, and security fundamentals for cloud-native delivery.',
                "badgeImage": 'https://res.cloudinary.com/dol8jpqwr/image/upload/v1765219779/download_afjvdg.png',
                "credentialUrl": 'https://www.cncf.io/training/certification/kcna/',
                "category": 'Cloud',
            }
        ]
        for a in ach_data: session.add(Achievement(**a))
        
        # 7. About
        about_profile = AboutProfile(
            tag="Profile Summary",
            heading="My Go-To Python & AI/ML Engineer",
            summary="Hi, I'm Abhay Manhas, a seasoned Python developer specializing in Python & AI/ML. With a background in Python platforms and bootstrapped AI startups, I help businesses automate processes, predict trends, and launch user-friendly web applications and helping to integrate the AI into their business.",
            ending="What sets me apart? Hands-on expertise across the Python ecosystem paired with a results-driven mindset. Ready to collaborate?"
        )
        session.add(about_profile)
        
        about_tiles = [
            AboutTile(title='Applied AI systems', description='Retrieval augmented generation, Model Context Protocol, evaluation harnesses, and guardrails that keep LLM features grounded in business outcomes.'),
            AboutTile(title='Resilient backends', description='Async Django architectures, realtime messaging, and background pipelines that scale without surprises.'),
            AboutTile(title='Cloud + operations', description='Azure, Kubernetes, and observability stacks tuned for fast feedback loops and hands-off reliability.'),
            AboutTile(title='Automation Workflows', description='Performing actions, combining agents, reduce human intervention'),
        ]
        for t in about_tiles: session.add(t)

        value_statements = [
            ValueStatement(title='Measure, then optimise', description='Anchor decisions in metrics—latency, accuracy, adoption—so teams debate facts, not guesses.'),
            ValueStatement(title='Ship responsibly', description='Guardrails, evaluations, and clear user messaging underpin every AI feature delivered.'),
            ValueStatement(title='Collaborate in the open', description='Async updates, transparent roadmaps, and tight feedback loops keep teams aligned.'),
        ]
        for v in value_statements: session.add(v)
        
        # 8. Experience
        exp_data = [
            {
                "role": 'Lead Python / AI Engineer',
                "company": 'Freelance & Consulting',
                "period": '2022 — Present',
                "summary": 'Partner with product leaders to ship AI-enabled platforms end-to-end, from discovery to production rollouts.',
                "link": 'https://www.upwork.com/freelancers/~0109aadeddb63e7a39?mp_source=share',
                "achievements": [
                    'Designed a hybrid-cloud LLM gateway that trimmed cost per request by 35% while maintaining latency SLOs.',
                    'Implemented a RAG service with semantic chunking, re-ranking, and automated evaluation reports for stakeholders.',
                    "Trained basic neural networks to build prediction models for regression and classification tasks",
                    'Built distributed Celery pipelines and WebSocket dashboards keeping ops teams informed in real time.',
                ]
            },
            {
                "role": 'Senior Backend Engineer',
                "company": 'Shubpy Solution Pvt. Ltd.',
                "period": '2023 — Present',
                "summary": 'Led Python squads modernising legacy systems with event-driven patterns and cloud-native deployments.',
                "link": 'https://shubpy.com/',
                "achievements": [
                    'Introduced observability instrumentation that reduced mean time to detect incidents by 45%.',
                    'Migrated monolith workloads to Kubernetes with zero downtime releases.',
                    "Handled project and team management, led development, and delivered efficient results within deadlines.",
                    'Mentored engineers on code architecture, async workflows, testing strategy, and AI feature integration.',
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

        # 9. Gallery
        gallery_profile = GalleryProfile(
            name='Abhay Manhas',
            tagline='AI/ML snapshots from the systems shipped into production.',
            image='https://res.cloudinary.com/dol8jpqwr/image/upload/v1758565569/display_aivyvw.png',
            highlight='Model evaluation frames, pipeline diagrams, and ops readouts captured between releases.',
            cta='View AI/ML Visuals'
        )
        session.add(gallery_profile)
        session.commit()
        session.refresh(gallery_profile)

        gallery_carousel = [
            GalleryCarousel(type='video', src='https://res.cloudinary.com/dol8jpqwr/video/upload/v1774984792/Hand_open_throwing_202603312319_1_qegbt1.mp4', title='Motion Capture', description='Real-time gesture tracking in action.', gallery_profile_id=gallery_profile.id),
            GalleryCarousel(type='image', src='https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/Deep_Learning_Architecture_Diagram__by_ProjectPro_lw6ox6.webp', title="Neuron's Communication", description='Deep Learning architecture at a glance.', gallery_profile_id=gallery_profile.id),
        ]
        for gc in gallery_carousel: session.add(gc)

        gallery_images = [
            GalleryImage(src='https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692120/Deep_Learning_Architecture_Diagram__by_ProjectPro_lw6ox6.webp', alt='Deep Learning Architecture', title="Neuron's Communication", width=1200, height=1200, location='Digital world.', capturedAt='October 2024', description='Deep Learning.', gallery_profile_id=gallery_profile.id),
            GalleryImage(src='https://res.cloudinary.com/dol8jpqwr/image/upload/v1766692121/1719922267958_urkgga.gif', alt='AI Classification flow chart', title='Flow Chart', width=1200, height=900, location='Ai Classification', capturedAt='June 2024', description='Types of Learning and Networks', gallery_profile_id=gallery_profile.id),
        ]
        for gi in gallery_images: session.add(gi)

        # 10. Logo Loop
        logos = [
            LogoLoopItem(name='Python', logo='Py'),
            LogoLoopItem(name='Django', logo='Dj'),
            LogoLoopItem(name='FastAPI', logo='FA'),
            LogoLoopItem(name='Azure', logo='Az'),
            LogoLoopItem(name='Kubernetes', logo='Kb'),
            LogoLoopItem(name='Redis', logo='Re'),
            LogoLoopItem(name='PostgreSQL', logo='Pg'),
            LogoLoopItem(name='OpenAI', logo='AI'),
        ]
        for l in logos: session.add(l)

        # 11. Blogs
        blogs_data = [
            {
                "slug": "artificial-intelligence-evolution",
                "title": "What is Artificial Intelligence and how it evolved",
                "summary": "Evolution of Artificial Intelligence",
                "content": "Artificial Intelligence has evolved from simple rule-based systems to complex neural networks...",
                "image": "https://res.cloudinary.com/dol8jpqwr/image/upload/v1773770257/ChatGPT_Image_Mar_17_2026_11_10_16_PM_pizet6.png",
                "date": "January 28, 2026",
                "tags": "AI,Engineering,History",
                "author": "Abhay Manhas"
            },
            {
                "slug": "machine-learning-and-its-types",
                "title": "What is Machine learning and how is it related to AI",
                "summary": "Machine learning which is the subset of artificial intelligence",
                "content": "Machine learning is the study of computer algorithms that improve automatically through experience...",
                "image": "https://res.cloudinary.com/dol8jpqwr/image/upload/v1773776378/Screenshot_2026-03-18_at_1.08.48_AM_iiwmv9.png",
                "date": "February 14, 2026",
                "tags": "AI,Machine Learning,Data Science",
                "author": "Abhay Manhas"
            }
        ]
        for b_data in blogs_data:
            session.add(Blog(**b_data))

        session.commit()
        print("Data migration complete.")

if __name__ == "__main__":
    migrate()
