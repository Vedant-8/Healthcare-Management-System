import os
from twilio.rest import Client

#twiilio details
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER =  os.getenv("TWILIO_PHONE_NUMBER")



def sms_medication_remainder(phone_number, medication='',tim=''):
    message_body = "hiiii"

    try:
        # Initialize Twilio client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        # Send SMS
        message = client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        print(f"Message SID: {message.sid}")
        return {"status": "success", "sid": message.sid}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    

# print(sms_medication_remainder(phone_number="+917045080926"))