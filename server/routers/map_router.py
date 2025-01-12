from fastapi import APIRouter, Depends, HTTPException
from services.map.Foursquare import GetPlacesUsingSquare, Get_5_hospitals
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from fastapi.responses import HTMLResponse
import os

router= APIRouter()
templates = Jinja2Templates(directory="/home/omkar/Documents/MedEase/templates")
mapbox_token=os.environ["mapbox_access_token"]

@router.get("/nearby_hospitals")
def GetNearbyHospitals(radius,Latitude,Longitude):
    query="Hospital"
    try:
        hospital_json=GetPlacesUsingSquare(query,radius,Latitude,Longitude)
        if not hospital_json:
            raise HTTPException(status_code=404, detail="No hospitals found")
        
        hospital_data=Get_5_hospitals(hospital_json)
        return {"top_5_hospitals": hospital_data}
        
    except HTTPException as http_error:
        # Raise HTTP exceptions for client-side errors (like 404)
        raise http_error
    
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")



@router.get("/nearby_pharmacy")
def GetNearbyHospitals(radius,Latitude,Longitude):
    query="pharmacy"
    try:
        pharmacy_json=GetPlacesUsingSquare(query,radius,Latitude,Longitude)
        if not pharmacy_json:
            raise HTTPException(status_code=404, detail="No hospitals found")
        
        pharmacy_data=Get_5_hospitals(pharmacy_json)
        return {"top_5_pharmacs": pharmacy_data}
        
    except HTTPException as http_error:
        # Raise HTTP exceptions for client-side errors (like 404)
        raise http_error
    
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")



@router.get("/directions", response_class=HTMLResponse)
async def get_directions(
    request: Request,
    origin_lat: float,
    origin_lon: float,
    dest_lat: float,
    dest_lon: float
):
    
    return templates.TemplateResponse(
        "map.html", 
        {
            "request": request,
            "mapbox_token": mapbox_token,
            "origin_lat": origin_lat,
            "origin_lon": origin_lon,
            "dest_lat": dest_lat,
            "dest_lon": dest_lon
        }
    )
    