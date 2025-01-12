from fastapi import APIRouter,HTTPException
import os
import requests
import json
from typing import Optional

x_api_key=os.environ["metri_port_api_key"]
facilityId="0194370c-bdfc-7b80-84d7-d75fcfc566db"

router= APIRouter()

# This endpoint, when executed, initiates an asynchronous query for documents across various Health Information Exchanges (HIEs).
# The process follows two steps:
# 1. The documents are first downloaded from the respective HIEs.
# 2. If the documents are in C-CDA/XML format, they will then be converted to the FHIR (Fast Healthcare Interoperability Resources) format.
@router.post('/start_document_query')
def document_query(patientId: str, facilityId: str):
    url = "https://api.sandbox.metriport.com/medical/v1/document/query"
    
    payload = {"metadata": {}}
    
    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }
    
    query = {
        "patientId": patientId,
        "facilityId": facilityId,
    }
    
    try:
        # Send the request
        response = requests.post(url, json=payload, params=query, headers=headers)
        response.raise_for_status()  # Raises HTTPError if the response code is 4xx/5xx

        # Return the response JSON
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


#get the status of the documents for the patient 
@router.get('/document_query_status')
def GetDocQueryStatus(patientId:str):
    url = "https://api.sandbox.metriport.com/medical/v1/document/query"
    
    headers = {
        "x-api-key": x_api_key,
    }
    
    query = {
        "patientId": patientId,
        "facilityId": facilityId,
    }
    
    try:
        # Send the request
        response = requests.get(url, params=query, headers=headers)
        response.raise_for_status()  # Raises HTTPError if the response code is 4xx/5xx

        # Return the response JSON
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
    
    
    
@router.get('/document_list')
def GetDocList(patientId:str):
    url = "https://api.sandbox.metriport.com/medical/v1/document"    
    headers = {
        "x-api-key": x_api_key,
    }
    
    query = {
        "patientId": patientId,
    }
    
    try:
        # Send the request
        response = requests.get(url, params=query, headers=headers)
        response.raise_for_status()  # Raises HTTPError if the response code is 4xx/5xx

        # Return the response JSON
        response=response.json()
        
        result=GetFormattedDocumentJson(response)        
        return result
        # return response
        
    except requests.exceptions.HTTPError as http_err:
        #logger.error(f"HTTP error occurred: {http_err}")
        raise HTTPException(status_code=response.status_code, detail=f"HTTP error occurred: {http_err}")
    
    except requests.exceptions.RequestException as err:
        #logger.error(f"Request error: {err}")
        raise HTTPException(status_code=500, detail=f"Request error: {err}")
    
    except Exception as e:
       # logger.error(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


#format the document json recieved from metriport 
def GetFormattedDocumentJson(response:json):
    
    documents_list = []

    for doc in response['documents']:
        document = {
            "resourceType": doc.get("resourceType"),
            #patient id
            "document_id": doc.get("id"),
            "versionId": doc.get("meta", {}).get("versionId"),
            "lastUpdated": doc.get("meta", {}).get("lastUpdated"),
            "status": doc.get("status"),
            "typeCoding": doc.get("type", {}).get("coding", [{}])[0],
            "subjectReference": doc.get("subject", {}).get("reference"),
            "date": doc.get("date"),
            "description": doc.get("description"),
            "attachment": doc.get("content", [{}])[0].get("attachment")
        }
        documents_list.append(document)
    
    
    return {"documents": get_doc_url_list({"doc":documents_list})}


#conversionType should only be used for converting XML/CDA files otherwise leave it blank. can convert to html or pdf only.
@router.get('/getDocumentURL')
def getDocumentURL(fileName:str, conversionType:Optional[str]=None):
    url = "https://api.sandbox.metriport.com/medical/v1/document/download-url"    
    
    headers = {
        "x-api-key": x_api_key,
    }
    
    query = {
        "fileName": fileName,
        "conversionType": conversionType
    }
    
    try:
        # Send the request
        response = requests.get(url, params=query, headers=headers)
        response.raise_for_status()  # Raises HTTPError if the response code is 4xx/5xx

        # Return the response JSON
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
    

#creates a doc refrence id for the pdf you are goping to upload and also provides a gateway link to upload the document
@router.post('/GetuploadDocURL')
def GETuploadDocURL(patientId:str):
    url = "https://api.sandbox.metriport.com/medical/v1/document/upload"    #example payload
    
    payload={
       
        "type": {
            "text": "Burn management Hospital Progress note",
            "coding": [
            {
                "code": "100556-0",
                "system": "http://loinc.org",
                "display": "Burn management Hospital Progress note",
            },
            ],
        },
        "context": {
            "period": {
            "start": "2023-10-10T14:14:17Z",
            },
            "facilityType": {
            "text": "City Hospital",
            },
        },
        "description": "Third degree wrist burn treatment",
    }

    headers = {
        "x-api-key": x_api_key,
        "Content-Type": "application/json"
    }
    
    query = {
        "patientId": patientId,
    }
   
    try:
    # Send the request
        response = requests.post(url, json=payload, headers=headers, params=query)
        response.raise_for_status()  # Raises HTTPError if the response code is 4xx/5xx

        # Return the response JSON
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
    
    
# #now actually uploading the medical url into the FHIR using mediport reference id and  url
# #max limity is 50MB
# @router.put('/uploadDocToFHIR')
# def uploadDocToFHIR():
#     pass


def get_doc_url_list(data):
    try:
        extracted_data = []
        
        # Access the list of documents from the 'doc' key
        documents = data.get("doc", [])
        
        for item in documents:
            attachment = item.get("attachment", {})  # Safely get attachment dictionary
            extracted_data.append({
                "title": attachment.get("title", "N/A"),  # Safe access with a default if title is not present
                "description": item.get("description"),
                #"url": attachment.get("url"),
                "size": attachment.get("size"),
                "creation": attachment.get("creation")
            })
        
        return extracted_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
