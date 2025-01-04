# main.py

from fastapi import FastAPI
from routers.map_router import router as map_router
import uvicorn 
from logging import Logger

app = FastAPI()

# Include the API routes
app.include_router(map_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to home page"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)