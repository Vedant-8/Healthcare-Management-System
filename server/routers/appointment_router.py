from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from sqlalchemy import create_engine, MetaData, Table, select, insert
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime,timezone
from models.appointments import Appointment
from sqlalchemy import update

COLUMN_NAMES = [
    "id",
    "patient_id",
    "hospital_id",
    "appointment_date",
    "appointment_time",
    "reason",
    "status",
    "insurance_provider",
    "insurance_id",
    "created_at",
    "updated_at",
]

# Set up the router
router = APIRouter()

# Retrieve the database URL from the environment
db_url = os.environ["postgres_url"]

# Create an engine and session
engine = create_engine(db_url, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Reflect the appointments table from the database
metadata = MetaData()
appointments_table = Table("appointments", metadata, autoload_with=engine)

@router.post("/create_appointment")
def create_appointment(
    patient_id: str,
    hospital_id: str,
    appointment_date: str,  # Expecting this in format: YYYY-MM-DD
    appointment_time: str,  # Format: HH:MM
    reason: Optional[str] = None,
    status: Optional[str] = "scheduled",
    insurance_provider: Optional[str] = None,
    insurance_id: Optional[str] = None,
):
    session = SessionLocal()
    try:
        # Convert the appointment_date to the correct format
        try:
            # Assume appointment_date comes in DD-MM-YYYY format, convert it to YYYY-MM-DD
            appointment_date = datetime.strptime(appointment_date, "%d-%m-%Y").strftime("%Y-%m-%d")
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format, expected DD-MM-YYYY")

        # Check if the appointment already exists
        check_stmt = select(appointments_table.c.appointment_id).where(
            (appointments_table.c.patient_id == patient_id) &
            (appointments_table.c.hospital_id == hospital_id) &
            (appointments_table.c.appointment_date == appointment_date) &
            (appointments_table.c.appointment_time == appointment_time)
        )
        
        existing_appointment = session.execute(check_stmt).fetchone()
        
        if existing_appointment:
            appointment_id = existing_appointment[0]
            return {"appointment_id": appointment_id, "message": "Appointment already exists"}

        # Insert the new appointment
        stmt = insert(appointments_table).values(
            patient_id=patient_id,
            hospital_id=hospital_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            reason=reason,
            status=status,
            insurance_provider=insurance_provider,
            insurance_id=insurance_id
        ).returning(appointments_table.c.appointment_id)

        # Execute the statement and commit
        result = session.execute(stmt)
        session.commit()

        # Retrieve the newly created appointment ID
        appointment_id = result.scalar()
        
        return {"appointment_id": appointment_id, "message": "Appointment created successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
        
        
    
# 2. Get Appointment by ID
@router.get("/appointment")
def get_appointment(appointment_id: str):
    with SessionLocal() as session:
        try:
            # Create a select statement to get the appointment by ID
            stmt = select(appointments_table).where(appointments_table.c.appointment_id == appointment_id)
            
            # Execute the query and fetch the result as a mapping
            result = session.execute(stmt).mappings().fetchone()
            
            # If the appointment doesn't exist, raise a 404 error
            if not result:
                raise HTTPException(status_code=404, detail="Appointment not found")
            
            # Convert the result to a dictionary to return as JSON
            appointment = dict(result)
            
            return appointment
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))



# @router.put("/update_appointment")
# def update_appointment(
#     appointment_id: int,  # Use path parameter for appointment ID
#     patient_id: Optional[str] = Query(None, description="UUID of the patient"),
#     hospital_id: Optional[str] = Query(None, description="UUID of the hospital"),
#     appointment_date: Optional[str] = Query(None, description="Date of the appointment (DD-MM-YYYY)"),
#     appointment_time: Optional[str] = Query(None, description="Time of the appointment (HH:MM)"),
#     reason: Optional[str] = Query(None, description="Reason for the appointment"),
#     status: Optional[str] = Query(None, description="Status of the appointment"),
#     insurance_provider: Optional[str] = Query(None, description="Insurance provider"),
#     insurance_id: Optional[str] = Query(None, description="Insurance ID"),
# ):
#     session = SessionLocal()
#     try:
#         # Fetch existing appointment to ensure it exists
#         check_stmt = select(appointments_table).where(appointments_table.c.id == appointment_id)
#         existing_appointment = session.execute(check_stmt).fetchone()

#         # If appointment not found, raise 404 error
#         if not existing_appointment:
#             raise HTTPException(status_code=404, detail="Appointment not found")

#         # Prepare the values for update
#         update_values = {
#             "patient_id": patient_id if patient_id else existing_appointment.patient_id,
#             "hospital_id": hospital_id if hospital_id else existing_appointment.hospital_id,
#             "appointment_date": datetime.strptime(appointment_date, "%d-%m-%Y").date() if appointment_date else existing_appointment.appointment_date,
#             "appointment_time": appointment_time if appointment_time else existing_appointment.appointment_time,
#             "reason": reason if reason else existing_appointment.reason,
#             "status": status if status else existing_appointment.status,
#             "insurance_provider": insurance_provider if insurance_provider else existing_appointment.insurance_provider,
#             "insurance_id": insurance_id if insurance_id else existing_appointment.insurance_id,
#             "updated_at": datetime.now(timezone.utc),  # Track the update time
#         }

#         # Create the update statement
#         stmt = (
#             update(appointments_table)
#             .where(appointments_table.c.id == appointment_id)  # Ensure you're using the correct column name
#             .values(update_values)
#         )

#         # Execute the update statement and commit
#         session.execute(stmt)
#         session.commit()

#         return {"message": "Appointment updated successfully", "appointment_id": appointment_id}
        
#     except Exception as e:
#         session.rollback()
#         raise HTTPException(status_code=500, detail=str(e))
#     finally:
#         session.close()


# # 4. Delete an Appointment
# @router.delete("/appointments/{appointment_id}")
# def delete_appointment(appointment_id: int):
#     query = "DELETE FROM appointments WHERE appointment_id = %s"
#     result = execute_query(query, (appointment_id,))
#     if result.rowcount == 0:
#         raise HTTPException(status_code=404, detail="Appointment not found")
#     return {"message": "Appointment deleted successfully"}



# 5. Get All Appointments for a Patient
@router.get("/patients/appointments")
def get_patient_appointments(patient_id: str):
    with SessionLocal() as session:
        try:
            # Create a select statement for appointments based on patient_id
            stmt = select(appointments_table).where(appointments_table.c.patient_id == patient_id)
            result = session.execute(stmt).fetchall()  # Get all appointment records

            if not result:
                raise HTTPException(status_code=404, detail="No appointments found for this patient.")

            # Convert rows into dictionaries
            appointments = [
                {COLUMN_NAMES[i]: value for i, value in enumerate(row)} for row in result
            ]

            return appointments  # Return the records as a list of JSON objects
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))



# 6. Get All Appointments for a Hospital
@router.get("/facility/appointments")
def get_hospital_appointments(hospital_id: str):
     with SessionLocal() as session:
        try:
            # Create a select statement for appointments based on hospital_id
            stmt = select(appointments_table).where(appointments_table.c.hospital_id == hospital_id)
            result = session.execute(stmt).fetchall()  # Get all appointment records

            if not result:
                raise HTTPException(status_code=404, detail="No appointments found for this hospital.")

            # Convert rows into dictionaries
            appointments = [
                {COLUMN_NAMES[i]: value for i, value in enumerate(row)} for row in result
            ]

            return appointments  # Return the records as a list of JSON objects
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
        
        
      