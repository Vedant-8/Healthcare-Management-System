from fastapi import APIRouter,HTTPException, Query, Body,Request, Header
import os
import hmac
import hashlib
import logging
from pathlib import Path
import json 
import datetime as dt

from  dependencies.redis.redis_helpers import save_to_redis
from services.webhook.medical_summary_webhook import getUrlfromData
from services.webhook.allergy_webhook import extract_allergy_intolerances
from services.webhook.conditions_webhook import extract_conditions
from services.webhook.insurance_webhook import extract_insurance_info
from services.webhook.Immunization_webhook import extract_immunization_data
from services.webhook.medication_statement_webhook import extract_medication_statements, join_medicine_data
from services.webhook.observation_webhook import extract_observations_lab,extract_observations_vitals
from services.webhook.Practitioner_webhook import extract_practitioner_data
from services.webhook.procedure_webhook import extract_procedures
from services.webhook.related_person_webook import extract_related_person_data


app = APIRouter()


logger = logging.getLogger("webhook")
logging.basicConfig(level=logging.INFO)
router=APIRouter()

# Replace with your webhook secret key
WEBHOOK_SECRET = os.environ["WEBHOOK_SECRET"]
JSON_FILE_PATH = Path("server/services/webhook/webhook_db.json")



@router.post("/webhook")
async def webhook(request: Request):
    try:
        # Log the request for debugging
        body = await request.json()
        
        if not body.get("meta",{}).get("data",{}).get("type",None): 
            return {"status": "success", "message": "Webhook processed successfully"}
        
        logger.info(f"Webhook received at {dt.datetime.now()}")
        #await append_to_json_file(body)
        
        patient_id=body["meta"]["data"]["patient_id"]
        webhook_type=body["meta"]["data"]["type"]
        
        if webhook_type=="MedicalRecordSummary":
           # print(body)
            cleaned_data=getUrlfromData(body)
            #print(cleaned_data)
            
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        elif webhook_type=="AllergyIntolerance":
            #print(body)
            cleaned_data=extract_allergy_intolerances([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
            
            
        elif webhook_type=="Condition":
            #print(body)
            cleaned_data=extract_conditions([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        
        elif webhook_type=="Coverage":
            #print(body)
            cleaned_data=extract_insurance_info([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        elif webhook_type=="Immunization":
            #print(body)
            cleaned_data=extract_immunization_data([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        elif webhook_type=="MedicationStatement":
            #print(body)
            prev_data=extract_medication_statements([body])
            cleaned_data=join_medicine_data(data=[body], prev_data=prev_data)
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        
        elif webhook_type=="Observation":
            #print(body)
            cleaned_data_lab=extract_observations_lab([body])
            cleaned_data_vitals=extract_observations_vitals([body])
            #print(cleaned_data)
            
            #print(cleaned_data_lab)
            await save_to_redis(patient_id=patient_id, webhook_type="lab" ,data=cleaned_data_lab)
            await save_to_redis(patient_id=patient_id, webhook_type="vitals" ,data=cleaned_data_vitals)
        

        elif webhook_type=="Practitioner":
            #print(body)
            cleaned_data=extract_practitioner_data([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        elif webhook_type=="Procedure":
            #print(body)
            cleaned_data=extract_procedures([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
        
        
        elif webhook_type=="RelatedPerson":
            #print(body)
            cleaned_data=extract_related_person_data([body])
            #print(cleaned_data)
            await save_to_redis(patient_id=patient_id, webhook_type=webhook_type ,data=cleaned_data)
            
        # Check for a "ping" message
        if body.get("ping"):
            return {"status": "success", "message": "Ping received", "ping": body["ping"]}

        # Process the actual payload
        if "meta" in body and "messageId" in body["meta"]:
            logger.info(f"Processing webhook message ID: {body['meta']['messageId']}")

        # Add your payload processing logic here
        return {"status": "success", "message": "Webhook processed successfully"}

    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
        raise HTTPException(status_code=500, detail=f"Webhook processing error: {e}")
