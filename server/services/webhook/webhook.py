from fastapi import APIRouter,HTTPException, Query, Body,Request, Header
import os
import hmac
import hashlib
import logging
from pathlib import Path
import json 
import datetime as dt

app = APIRouter()
logger = logging.getLogger("webhook_logger")
logging.basicConfig(level=logging.INFO)
router=APIRouter()

# Replace with your webhook secret key
WEBHOOK_SECRET = os.environ["WEBHOOK_SECRET"]
JSON_FILE_PATH = Path("server/services/webhook/webhook_db.json")


# Ensure the JSON file exists
if not JSON_FILE_PATH.exists():
    with open(JSON_FILE_PATH, "w") as f:
        json.dump([], f)  # Initialize an empty list in the file
        
async def append_to_json_file(body):
    json_file_path=JSON_FILE_PATH
    try:
        # Ensure the file exists and initialize if empty
        if not os.path.exists(json_file_path):
            with open(json_file_path, "w") as f:
                json.dump([], f)

        # Open the JSON file for reading and writing
        with open(json_file_path, "r+") as f:
            try:
                data = json.load(f)  # Load existing data
            except json.JSONDecodeError:
                # If the file is empty or corrupted, start with an empty list
                data = []

            # Ensure data is a list
            if not isinstance(data, list):
                raise ValueError("JSON root element must be a list.")

            data.append(body)  # Append the new body
            f.seek(0)  # Reset file pointer to the beginning
            json.dump(data, f, indent=4)  # Save updated data
            f.truncate()  # Remove any leftover content in the file
    except Exception as e:
        print(f"An error occurred: {e}")
        
@router.post("/webhook")
async def webhook(request: Request):
    try:
        # Log the request for debugging
        body = await request.json()
        logger.info(f"Webhook received at {dt.datetime.now()}")

        await append_to_json_file(body)
        
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




