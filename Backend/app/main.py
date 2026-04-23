from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, init_db
from .routes import portfolio
from .admin import setup_admin

app = FastAPI(title="Portfolio Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(portfolio.router)

# Setup Admin
setup_admin(app, engine)

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio Backend API", "admin_panel": "/admin"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
