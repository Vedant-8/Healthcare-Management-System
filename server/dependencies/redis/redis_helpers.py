import redis
import logging
from pathlib import Path
import json 
import datetime as dt


logger = logging.getLogger("redis")
logging.basicConfig(level=logging.INFO)
redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)


async def save_to_redis(patient_id, webhook_type, data):
    """
    Save webhook data to Redis with patient_id and webhook_type as the key.
    """
    try:
        # Combine patient_id and webhook_type to form a unique key
        redis_key = f"patient:{patient_id}:webhook_type:{webhook_type}"
        
        # Check if data already exists for this patient and webhook_type
        existing_data = redis_client.get(redis_key)

        if existing_data:
            # Append to existing data
            existing_data = json.loads(existing_data)
            if isinstance(existing_data, list):
                existing_data.append(data)
            else:
                existing_data = [existing_data, data]
        else:
            # Initialize new list for this patient_id and webhook_type
            existing_data = [data]

        # Save the updated data to Redis
        redis_client.set(redis_key, json.dumps(existing_data))
        logger.info(f"Webhook data saved for patient ID: {patient_id}, webhook type: {webhook_type}")
    except Exception as e:
        logger.error(f"Error saving data to Redis: {e}")
        raise

def get_user_data_from_redis(patient_id: str, webhook_type: str):
    """
    Retrieve specific JSON data for a patient ID and webhook type from Redis.

    Args:
        patient_id (str): The patient ID (key in Redis).
        webhook_type (str): The webhook type to filter data.

    Returns:
        dict: A dictionary with status and filtered data or error message.
    """
    try:
        # Combine patient_id and webhook_type to form a unique key
        redis_key = f"patient:{patient_id}:webhook_type:{webhook_type}"

        # Get the data for the patient and webhook_type from Redis
        patient_data = redis_client.get(redis_key)
        
        if not patient_data:
            return {"status": "error", "message": f"No data found for patient ID: {patient_id} and webhook type: {webhook_type}"}

        # Parse JSON data
        patient_data = json.loads(patient_data)

        return {"status": "success", "data": patient_data}

    except Exception as e:
        return {"status": "error", "message": f"Error retrieving data: {e}"}

# print(get_user_data_from_redis(patient_id="01943bc1-fd38-7c9c-9947-14f7458a7428", webhook_type="MedicalRecordSummary"))




def clear_all_redis_data():
    """
    Clears all data from Redis.
    """
    try:
        # Clear all data from Redis
        redis_client.flushall()
        logger.info("All data cleared from Redis.")
    except Exception as e:
        logger.error(f"Error clearing data from Redis: {e}")
        raise


# clear_all_redis_data()