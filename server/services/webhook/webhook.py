from fastapi import APIRouter,HTTPException, Query, Body,Request, Header

import hmac
import hashlib
import logging

app = APIRouter()
logger = logging.getLogger("webhook_logger")
logging.basicConfig(level=logging.INFO)
router=APIRouter()

# Replace with your webhook secret key
WEBHOOK_SECRET = "AuqX1244rHRQobeQrUTiU"

@router.post("/webhook")
async def webhook(request: Request):
    try:
        # Log the request for debugging
        body = await request.json()
        logger.info(f"Webhook received: {body}")

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