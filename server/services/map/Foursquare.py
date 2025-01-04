import requests
import os
import json
import pandas as pd
from dotenv import load_dotenv
from .helpers import generate_email,generate_phone_number

load_dotenv()
foursquare_api_key= os.environ["foursquare_apikey"]
hospital_category_code=os.environ["hospital_category_code"]

#get raw json data from Foursquare api
def GetPlacesUsingSquare(query:str, radius:int, Latitude: str, Longitude:str)->json:
    url = "https://api.foursquare.com/v3/places/search"
    
    headers = {
        "accept": "application/json",
        "Authorization": "fsq3PonFUTixKpgTr9bqZexNGX25h+flwdiudTQAJXEdPtU="
    }
    
    params = {
        "query":query,
        "ll": f"{Latitude},{Longitude}",
        "radius": radius,
        "categories": hospital_category_code,  # Replace with your category code
    }
    
    # Send the GET request
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Request failed", "message": str(e)}



#get hospital csv based on the current users location
def HospitalJsonToCSV(hospital_data:json)->None:
    try:
        processed_data = []

        for item in hospital_data['results']:
            location = item.get('geocodes', {}).get('main', {})
            address = item.get('location', {})
            phone_number = generate_phone_number()
            email = generate_email(item.get("name", "unknown hospital"))
            
            processed_data.append({
                "fsq_id": item.get("fsq_id"),
                "name": item.get("name"),
                "distance": item.get("distance"),
                "latitude": location.get("latitude"),
                "longitude": location.get("longitude"),
                "address": address.get("address"),
                "locality": address.get("locality"),
                "region": address.get("region"),
                "postcode": address.get("postcode"),
                "country": address.get("country"),
                "formatted_address": address.get("formatted_address"),
                "phone number": phone_number,
                "email": email,
                "categories": ", ".join([category["name"] for category in item.get("categories", [])]),
                "closed_bucket": item.get("hours", {}).get("closed_bucket"),
                "timezone": item.get("timezone"),
                "link": item.get("link")
            })

        # Create a DataFrame
        df = pd.DataFrame(processed_data)

        # Save to CSV
        df.to_csv("server/hospital_data/temp_hospital_data.csv", index=False)

        print("CSV file 'temp_hospital_data.csv' created successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    return 
        
def Get_5_hospitals(hospital_data:json)->None:
    try:
        processed_data = []

        for item in hospital_data['results'][:5]:
            location = item.get('geocodes', {}).get('main', {})
            address = item.get('location', {})
            phone_number = generate_phone_number()
            email = generate_email(item.get("name", "unknown hospital"))
            
            processed_data.append({
                "fsq_id": item.get("fsq_id"),
                "name": item.get("name"),
                "distance": item.get("distance"),
                "latitude": location.get("latitude"),
                "longitude": location.get("longitude"),
                "address": address.get("address"),
                "locality": address.get("locality"),
                "region": address.get("region"),
                "postcode": address.get("postcode"),
                "country": address.get("country"),
                "formatted_address": address.get("formatted_address"),
                "phone number": phone_number,
                "email": email,
                "categories": ", ".join([category["name"] for category in item.get("categories", [])]),
                "closed_bucket": item.get("hours", {}).get("closed_bucket"),
                "timezone": item.get("timezone"),
                "link": item.get("link")
            }) 
        
        return processed_data
            
    except Exception as e:
        return f"An error occurred: {e}"
    
#usecase
# query = ''
# users_loc = (19.13, 72.82)
# radius = 10000

# res = GetPlacesUsingSquare(query, radius, users_loc)

# HospitalJsonToCSV(res)