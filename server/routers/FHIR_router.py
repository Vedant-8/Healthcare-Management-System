from fastapi import APIRouter,HTTPException
import os
import requests
import json
from typing import List, Optional

x_api_key=os.environ["metri_port_api_key"]
facilityId="0194370c-bdfc-7b80-84d7-d75fcfc566db"

router= APIRouter()



#gets all data of the patient to our custom webhook
@router.post('/fhir/consolidated_query')
def StartConsolidatedDataQuery(id: str,
    dateFrom: Optional[str] = None ,
    dateTo: Optional[str] = None ,
    conversionType: Optional[str] = None,
    resources: Optional[str] = None,
):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{id}/consolidated/query"
    
    # Build the payload dynamically
    query = {}
    payload = {"metadata": {}}
    
    if resources:
        query["resources"] = resources
            
    if dateFrom:
        query["dateFrom"] = dateFrom
    if dateTo:
        query["dateTo"] = dateTo
    if conversionType:
        query["conversionType"] = conversionType
        

    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }

    try:
        # Make the POST request
        response = requests.post(url, json=payload, headers=headers, params=query)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
        return response.json()

    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")

    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=f"Request error: {err}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")






@router.get('/fhir/consolidated_query_status')
def GetConsolidatedDataQueryStatus(id:str):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{id}/consolidated/query"
    
    payload = {"metadata": {}}
    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }
    
    try:
        response=requests.post(url, json=payload, headers=headers)
        return response.json()
    
    except requests.exceptions.HTTPError as http_err:
        #logger.error(f"HTTP error occurred: {http_err}")
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")
    
    except requests.exceptions.RequestException as err:
        #logger.error(f"Request error: {err}")
        raise HTTPException(status_code=500, detail=f"Request error: {err}")
    
    except Exception as e:
       # logger.error(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}") 
    
    
@router.get('/fhir/count_data')
def CountPatientData(patientId:str):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{patientId}/consolidated/count"    
    
    payload = {"metadata": {}}
    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }
    
    try:
        response=requests.get(url, json=payload, headers=headers)
        return response.json()
    
    except requests.exceptions.HTTPError as http_err:
        #logger.error(f"HTTP error occurred: {http_err}")
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")
    
    except requests.exceptions.RequestException as err:
        #logger.error(f"Request error: {err}")
        raise HTTPException(status_code=500, detail=f"Request error: {err}")
    
    except Exception as e:
       # logger.error(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}") 


#to be aded code for later
@router.post('/fhir/getMedicalHistroy')
def GetMedicalHistoryData(id: str,
    dateFrom: Optional[str] = None ,
    dateTo: Optional[str] = None ,
    conversionType: Optional[str] = "pdf",
    resources: Optional[str] = None,
):
    url = f"https://api.sandbox.metriport.com/medical/v1/patient/{id}/consolidated/query"
    
    # Build the payload dynamically
    query = {}
    payload = {"metadata": {}}
    
    if resources:
        query["resources"] = resources
            
    if dateFrom:
        query["dateFrom"] = dateFrom
    if dateTo:
        query["dateTo"] = dateTo
    if conversionType:
        query["conversionType"] = conversionType
        

    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }

    try:
        # Make the POST request
        response = requests.post(url, json=payload, headers=headers, params=query)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
        return response.json()

    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")

    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=500, detail=f"Request error: {err}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
