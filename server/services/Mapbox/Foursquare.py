import requests
import os
import json
import pandas as pd
from dotenv import load_dotenv

load_dotenv()
foursquare_api_key= os.environ["foursquare_apikey"]
hospital_category_code=os.environ["hospital_category_code"]


def GetPlacesUsingSquare(query:str, radius:int, users_loc:tuple)->json:
    url = "https://api.foursquare.com/v3/places/search"
    
    headers = {
        "accept": "application/json",
        "Authorization": "fsq3PonFUTixKpgTr9bqZexNGX25h+flwdiudTQAJXEdPtU="
    }
    
    params = {
        "query":query,
        "ll": f"{users_loc[0]},{users_loc[1]}",
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


def HospitalJsonToCSV(hospital_data:json)->None:
    try:
        processed_data = []
        for item in hospital_data['results']:
            location = item.get('geocodes', {}).get('main', {})
            address = item.get('location', {})
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
                "categories": ", ".join([category["name"] for category in item.get("categories", [])]),
                "closed_bucket": item.get("hours", {}).get("closed_bucket"),
                "timezone": item.get("timezone"),
                "link": item.get("link")
            })

        # Create a DataFrame
        df = pd.DataFrame(processed_data)

        # Save to CSV
        df.to_csv("hospitals.csv", index=False)

        print("CSV file 'hospitals.csv' created successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    return 

query = ''
users_loc = (19.13, 72.82)
radius = 10000

res = GetPlacesUsingSquare(query, radius, users_loc)

HospitalJsonToCSV(res)
