# main.py
from fastapi import FastAPI, HTTPException, Request
import uvicorn 
from fastapi.middleware.cors import CORSMiddleware
import logging
import os, time, asyncio

from routers.map_router import router as map_router
from routers.patient_router import router as patient_router
from routers.document_router import router as document_router
from routers.FHIR_router import router as FHIR_router
from services.webhook.webhook import router as webhook_router
from routers.appointment_router import router as appointment_router

from dependencies.redis.redis_helpers import get_user_data_from_redis, clear_all_redis_data
from routers.FHIR_router import StartConsolidatedDataQuery, GetMedicalHistoryData


app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ngrok_url=os.environ["ngrok_url"]

#middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the API routes
app.include_router(map_router, prefix="/api")
app.include_router(patient_router, prefix="/api")
app.include_router(document_router, prefix="/api")
app.include_router(webhook_router, prefix="/api")
app.include_router(FHIR_router, prefix="/api")
app.include_router(appointment_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to home page"}



@app.get("/redis/data")
async def get_cached_data(request: Request, patient_id: str, webhook_type: str):
    try:
        response = await get_user_data_from_redis(patient_id=patient_id, webhook_type=webhook_type)
        
        # Cache miss
        if response["status"] == "error":
            print("Cache miss")
            payload = {
                "metadata": {
                    "patient_id": patient_id,
                    "type": webhook_type
                }
            }
            
            if webhook_type=="MedicalRecordSummary":
                await GetMedicalHistoryData(request=request, id=patient_id, payload=payload)
            else:
                # Start this query
                await StartConsolidatedDataQuery(request=request, id=patient_id, resources=webhook_type, payload=payload)

            # Wait asynchronously for potential data availability
            await asyncio.sleep(2)
            
            # Retry fetching data from Redis
            response = await get_user_data_from_redis(patient_id=patient_id, webhook_type=webhook_type)
                
            return response

        # Cache hit
        else:
            print("Cache hit")
            return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@app.post('/clear_redis_cache')
def clear_cache(auth_key):
    if auth_key==os.environ["WEBHOOK_SECRET"]:
        clear_all_redis_data()
        return {
            "status":"success",
            "message": "cleared redis cache successfully"
        }
    
    else:
        return {
            "status":"success",
            "message": "Unauthenticated request"
        }
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8050, reload=True)