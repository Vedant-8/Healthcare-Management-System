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
    
    # formatted_data=json.dumps(data, indent=4)
    # print(formatted_data)

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

# Example: User's coordinates Latitude: 19.0388022, Longitude: 73.0840487
# latitude = 19.0388022  # Replace with actual latitude
# longitude = 73.0840487  # Replace with actual longitude
# query_id=os.environ["mapbox_hospital_id"]
# hospitals = find_nearby_hospitals(latitude, longitude,query_id)
# if not hospitals: print('NO hospitals loocated')
# for hospital in hospitals:
#     print(hospital)




locations = [
    {"name": "Satish S Joshi Clinic", "latitude": 19.04049093, "longitude": 73.0810788},
    {"name": "BARC Kharghar Dispensary", "latitude": 19.04190692, "longitude": 73.07859687},
    {"name": "Department of Dental", "latitude": 19.04192232, "longitude": 73.07860333},
    {"name": "Department of X-Ray", "latitude": 19.04187772, "longitude": 73.07855142},
    {"name": "Bharatiya Vidyapeet Medical College", "latitude": 19.03679051, "longitude": 73.0779026},
]

# import json

# # Example list of locations (with names, latitude, and longitude)
# locations = [
#     {"name": "Satish S Joshi Clinic", "latitude": 19.04049093, "longitude": 73.0810788},
#     {"name": "BARC Kharghar Dispensary", "latitude": 19.04190692, "longitude": 73.07859687},
#     {"name": "Department of Dental", "latitude": 19.04192232, "longitude": 73.07860333},
#     {"name": "Department of X-Ray", "latitude": 19.04187772, "longitude": 73.07855142},
#     {"name": "Bharatiya Vidyapeet Medical College", "latitude": 19.03679051, "longitude": 73.0779026},
# ]

# # Convert to GeoJSON format
# def generate_geojson(locations):
#     geojson = {
#         "type": "FeatureCollection",
#         "features": []
#     }
    
#     for location in locations:
#         feature = {
#             "type": "Feature",
#             "geometry": {
#                 "type": "Point",
#                 "coordinates": [location["longitude"], location["latitude"]]
#             },
#             "properties": {
#                 "name": location["name"]
#             }
#         }
#         geojson["features"].append(feature)
    
#     return geojson

# geojson_data = generate_geojson(locations)

# # Save GeoJSON to file (optional)
# with open("locations.geojson", "w") as f:
#     json.dump(geojson_data, f)

# print("GeoJSON data created successfully!")

# #  // GeoJSON data for the markers
# #                 const geojson = {
# #                     "type": "FeatureCollection",
# #                     "features": [
# #                         { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.0810788, 19.04049093] }, "properties": { "name": "Satish S Joshi Clinic" } },
# #                         { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.07859687, 19.04190692] }, "properties": { "name": "BARC Kharghar Dispensary" } },
# #                         { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.07860333, 19.04192232] }, "properties": { "name": "Department of Dental" } },
# #                         { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.07855142, 19.04187772] }, "properties": { "name": "Department of X-Ray" } },
# #                         { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.0779026, 19.03679051] }, "properties": { "name": "Bharatiya Vidyapeet Medical College" } }
# #                     ]
# #                 };





#get any location on the map




