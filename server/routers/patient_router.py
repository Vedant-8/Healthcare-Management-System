from fastapi import APIRouter,HTTPException, Query, Body,Request
import os
import requests
import json
from pydantic import BaseModel
from typing import List

x_api_key=os.environ["metri_port_api_key"]
router= APIRouter()


# Address schema
class Address(BaseModel):
    addressLine1: str
    city: str
    state: str
    zip: str
    country: str

# Payload schema
class PatientPayload(BaseModel):
    firstName: str
    lastName: str
    dob: str
    genderAtBirth: str
    address: List[Address]

# # Query schema
# class facilityId(BaseModel):
#     facilityId: str


#creates a patient on Metripoint dashboard
@router.post('/createPatient')
def create_patient(
    request: Request, 
    payload: PatientPayload = Body(...),  # Parse the request body
    facilityId: str = Query(...),         # Parse the query parameter
):
    
    url = "https://api.sandbox.metriport.com/medical/v1/patient"
    
    headers = {
    "x-api-key": x_api_key,
    "Content-Type": "application/json"
    }
    
    query={
        "facilityId": facilityId
    }
    payload=payload.model_dump()
    
    try:
        response = requests.post(url, params=query, json=payload, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        return {"status": response.status_code, "data": response.json()}  # Return the status and response data

    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")

    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=f"Request error: {err}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    

#get patient data from Metripoint dashboard
@router.get('/getpatient')
def get_patient(id: str):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{id}"
    headers = {"x-api-key": x_api_key}

    try:
        response = requests.get(url, headers=headers)  # Use requests.get for clarity
        response.raise_for_status()  # Raises an HTTPError for bad responses

        patient_data = response.json()  # Directly parse JSON from response
        return {"patientData": patient_data}

    except requests.exceptions.HTTPError as http_err:
        # Handle HTTP errors
        return {"error": f"HTTP error occurred: {http_err}"}

    except requests.exceptions.RequestException as err:
        # Handle other request-related errors
        return {"error": f"Error occurred: {err}"}

    except Exception as e:
        # Catch any other exceptions
        return {"error": f"An unexpected error occurred: {e}"}


#update patient data from metripoint dashboard
@router.put('/update_patient')
def updatePatient(request: Request, 
    payload: PatientPayload = Body(...),  # Parse the request body
    facilityId: str = Query(...),         # Parse the query parameter
):
    
    url = "https://api.sandbox.metriport.com/medical/v1/patient"
    
    headers = {
    "x-api-key": x_api_key,
    "Content-Type": "application/json"
    }
    
    query={
        "facilityId": facilityId
    }
    payload=payload.model_dump()
    
    try:
        response = requests.post(url, params=query, json=payload, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses

        return {"status": response.status_code, "data": response.json()}  # Return the status and response data

    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")

    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=f"Request error: {err}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    
    

#get patient data from Metripoint dashboard
@router.delete('/delete_patient')
def get_patient(id: str):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{id}"
    headers = {"x-api-key": x_api_key}

    try:
        response = requests.get(url, headers=headers)  # Use requests.get for clarity
        response.raise_for_status()  # Raises an HTTPError for bad responses

        patient_data = response.json()  # Directly parse JSON from response
        return {"patientData": patient_data}

    except requests.exceptions.HTTPError as http_err:
        # Handle HTTP errors
        return {"error": f"HTTP error occurred: {http_err}"}

    except requests.exceptions.RequestException as err:
        # Handle other request-related errors
        return {"error": f"Error occurred: {err}"}

    except Exception as e:
        # Catch any other exceptions
        return {"error": f"An unexpected error occurred: {e}"}




@router.get('/googlefit_data')
def send_google_fit_data_monthwise(month:int):
    month_map = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    # Validate month
    if month < 1 or month > 12:
        raise ValueError("Month must be between 1 and 12.")

    # Get the correct month name
    month_name = month_map[month]
    
    # Define the path to the JSON file
    loc = f"/home/omkar/Documents/MedEase/server/fit_data/summary_reports/sumary_2024/{month}_{month_name}_google_fit.json"

    try:
        # Open and load the JSON data from the file
        with open(loc, 'r') as file:
            data = json.load(file)
    
        return data  # Return the loaded JSON data as it is, or modify as needed

    except FileNotFoundError:
        print(f"data not found")
        return []
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return []
