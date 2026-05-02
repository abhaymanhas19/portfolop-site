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

@app.on_event("startup")
def on_startup():
    """Initializes the database on application startup."""
    init_db()

from app.routes.blog import router as blog_router

app.include_router(blog_router)

# Setup Admin
admin = Admin(app, engine)
register_admin(admin)

