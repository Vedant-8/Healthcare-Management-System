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


logger = logging.getLogger("webhook_logger")
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





# # Ensure the JSON file exists
# if not JSON_FILE_PATH.exists():
#     with open(JSON_FILE_PATH, "w") as f:
#         json.dump([], f)  # Initialize an empty list in the file
        
# async def append_to_json_file(body):
#     json_file_path=JSON_FILE_PATH
#     try:
#         # Ensure the file exists and initialize if empty
#         if not os.path.exists(json_file_path):
#             with open(json_file_path, "w") as f:
#                 json.dump([], f)

#         # Open the JSON file for reading and writing
#         with open(json_file_path, "r+") as f:
#             try:
#                 data = json.load(f)  # Load existing data
#             except json.JSONDecodeError:
#                 # If the file is empty or corrupted, start with an empty list
#                 data = []

#             # Ensure data is a list
#             if not isinstance(data, list):
#                 raise ValueError("JSON root element must be a list.")

#             data.append(body)  # Append the new body
#             f.seek(0)  # Reset file pointer to the beginning
#             json.dump(data, f, indent=4)  # Save updated data
#             f.truncate()  # Remove any leftover content in the file
#     except Exception as e:
#         print(f"An error occurred: {e}")
   
   