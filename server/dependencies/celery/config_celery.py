from celery import Celery, shared_task
from datetime import datetime, timedelta
from twilio.rest import Client
import pytz
import os
import logging

# Twilio Configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# Celery Configuration
app = Celery('tasks', broker='redis://localhost:6379/0')  # Adjust broker URL as needed
app.conf.timezone = 'Asia/Kolkata'   # Set your timezone

# Logging Configuration
logger = logging.getLogger("celery")
logging.basicConfig(level=logging.INFO)

@shared_task
def sms_medication_reminder(phone_number, sms_content):
    """
    Sends an SMS reminder for a medication using Twilio.
    """
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=sms_content,
            from_=TWILIO_PHONE_NUMBER,
            to=f'+91{phone_number}'
        )
        logger.info(f"Message sent successfully! SID: {message.sid}")
        return {"status": "success", "sid": message.sid}
    except Exception as e:
        logger.error(f"Error sending SMS: {e}")
        return {"status": "error", "message": str(e)}

@shared_task
def schedule_sms_reminders(medication_info, phone_number):
    """
    Schedules SMS reminders for medication based on start and end dates and reminder times.
    """
    try:
        logger.info("scheduling in celery")
        medicine_name = medication_info['medicineName']
        dosage = medication_info['power']
        start_date = datetime.strptime(medication_info['startDate'], "%Y-%m-%d").date()
        end_date = datetime.strptime(medication_info['endDate'], "%Y-%m-%d").date()
        sms_content = medication_info['sms']

        # Scheduled reminder times (adjust based on the specific medication)
        reminder_times = ["09:30 AM", "12:52 AM"]

        # Iterate through each day in the range and schedule reminders
        current_date = start_date
        while current_date <= end_date:
            for reminder_time in reminder_times:
                scheduled_time = datetime.combine(
                    current_date,
                    datetime.strptime(reminder_time, "%I:%M %p").time()
                ).astimezone(pytz.timezone('Asia/Kolkata'))

                # Convert scheduled time to UTC
                utc_scheduled_time = scheduled_time.astimezone(pytz.utc)

                # Schedule the SMS reminder
                sms_medication_reminder.apply_async(
                    (phone_number, sms_content),
                    eta=utc_scheduled_time
                )
                logger.info(f"Reminder scheduled for {medicine_name} on {utc_scheduled_time} (UTC).")

            current_date += timedelta(days=1)

        return {"status": "success", "message": "SMS reminders scheduled successfully!"}

    except Exception as e:
        logger.error(f"Error scheduling SMS reminders: {e}")
        return {"status": "error", "message": str(e)}
