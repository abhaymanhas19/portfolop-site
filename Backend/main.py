from fastapi import FastAPI

app = FastAPI(title="Portfolio Backend")

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
