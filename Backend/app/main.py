"""Main FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.database import engine, init_db
from app.admin import register_admin
from app.auth import AdminAuth
from sqladmin import Admin
from app.config import settings
import os

app = FastAPI(title="Portfolio Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(
    SessionMiddleware, 
    secret_key=settings.session_secret
)

@app.on_event("startup")
def on_startup():
    """Initializes the database on application startup."""
    init_db()

from app.routes.blog import router as blog_router
from app.routes.mail import router as mail_router
from app.routes.skill import router as skill_router
from app.routes.project import router as project_router
from app.routes.achievement import router as achievement_router
from app.routes.about import router as experience_router
from app.routes.product import router as product_router
from app.routes.social import router as social_router
from app.routes.media import router as media_router

app.include_router(skill_router)
app.include_router(project_router)
app.include_router(achievement_router)
app.include_router(experience_router)
app.include_router(product_router)
app.include_router(blog_router)
app.include_router(social_router)
app.include_router(media_router)
app.include_router(mail_router)

# Setup Admin with Authentication
authentication_backend = AdminAuth(secret_key=settings.session_secret)
admin = Admin(app, engine, authentication_backend=authentication_backend)
register_admin(admin)

