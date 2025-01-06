from fastapi import APIRouter,HTTPException
import os
import requests
import json


x_api_key=os.environ["metri_port_api_key"]
facilityId="0194370c-bdfc-7b80-84d7-d75fcfc566db"

router= APIRouter()


