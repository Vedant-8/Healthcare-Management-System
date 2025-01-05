from fastapi import APIRouter,HTTPException
import os
import requests
import json

x_api_key=os.environ["metri_port_api_key"]
facilityId="0194370c-bdfc-7b80-84d7-d75fcfc566db"

router= APIRouter()

#Start Document Query
@router.post()
def document_query(patientId:str, facilityId:str):
    url = "https://api.sandbox.metriport.com/medical/v1/document/query"

    payload = {"metadata": {}}
    headers = {
        "x-api-key":x_api_key,
        "Content-Type": "application/json"
    }
    query={
    "patientId": patientId,
    "facilityId":facilityId,
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)