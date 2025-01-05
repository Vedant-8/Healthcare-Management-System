# main.py

from fastapi import FastAPI
from routers.map_router import router as map_router
from server.routers.patient_router import router as appointment_scheduler
import uvicorn 
from logging import Logger
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the API routes
app.include_router(map_router, prefix="/api")
app.include_router(appointment_scheduler, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to home page"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)