# main.py

from fastapi import FastAPI
import uvicorn 
from logging import Logger
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
import logging

from routers.map_router import router as map_router
from routers.patient_router import router as patient_router
from routers.document_router import router as document_router

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ngrok_url="https://e721-103-167-123-72.ngrok-free.app"

#middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ngrok_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the API routes
app.include_router(map_router, prefix="/api")
app.include_router(patient_router, prefix="/api")
app.include_router(document_router, prefix="/api")



@app.get("/")
def root():
    return {"message": "Welcome to home page"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)