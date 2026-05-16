"""Main FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, init_db
from app.admin import register_admin
from sqladmin import Admin

app = FastAPI(title="Portfolio Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from starlette.middleware.sessions import SessionMiddleware
from app.auth import AdminAuth
import os

# Add SessionMiddleware (required for SQLAdmin authentication)
# It uses a secret key from your environment or defaults to a generic string
app.add_middleware(
    SessionMiddleware, 
    secret_key=os.getenv("SESSION_SECRET", "super-secret-session-key")
)

@app.on_event("startup")
def on_startup():
    """Initializes the database on application startup."""
    init_db()

from app.routes.blog import router as blog_router
from app.routes.mail import router as mail_router

app.include_router(blog_router)
app.include_router(mail_router)

# Setup Admin with Authentication
authentication_backend = AdminAuth(secret_key=os.getenv("SESSION_SECRET", "super-secret-session-key"))
admin = Admin(app, engine, authentication_backend=authentication_backend)
register_admin(admin)

