import requests
import os
import json
access_token = os.environ["mapbox_access_token"]

def find_nearby_hospitals(latitude, longitude, query_id):
    url = f"https://api.mapbox.com/search/searchbox/v1/retrieve/{query_id}"
    params = {
        "proximity": f"{longitude},{latitude}",
        "types": "poi",
        "limit":10,
        "access_token": access_token
    }

    response = requests.get(url, params=params)
    data = response.json()
    if data is None:
        return []
    
    # Extract and print hospital details
    hospital_data = []
    for feature in data["features"]:
        name = feature["properties"]["name"]
        address = feature["properties"]["full_address"]
        longitude, latitude = feature["geometry"]["coordinates"]
        
        hospital_data.append({
            "name": name,
            "address": address,
            "latitude": latitude,
            "longitude": longitude
        })
    
    return hospital_data
