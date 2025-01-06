# main.py
from fastapi import FastAPI
import uvicorn 
from fastapi.middleware.cors import CORSMiddleware
import logging
import os

from routers.map_router import router as map_router
from routers.patient_router import router as patient_router
from routers.document_router import router as document_router
from routers.FHIR_router import router as FHIR_router
from services.webhook.webhook import router as webhook_router

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ngrok_url=os.environ["ngrok_url"]

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
app.include_router(webhook_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to home page"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)