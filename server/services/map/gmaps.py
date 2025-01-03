import googlemaps
import os
def get_hospital_contact_info(api_key, name, latitude, longitude):
    # Initialize the Google Maps client
    gmaps = googlemaps.Client(key=api_key)
    
    # Perform a places search using the hospital name and coordinates
    places_result = gmaps.places_nearby(location=(latitude, longitude), radius=5000, type="hospital")
    
    # Look for the hospital by name in the results
    for place in places_result.get('results', []):
        if name.lower() in place['name'].lower():  # Match hospital name
            place_details = gmaps.place(place['place_id'])  # Get more details using the place_id
            result = place_details['result']
            
            # Extract contact info
            phone_number = result.get('formatted_phone_number', 'Not Available')
            address = result.get('formatted_address', 'Not Available')
            website = result.get('website', 'Not Available')
            
            return {
                "name": result.get('name'),
                "address": address,
                "phone_number": phone_number,
                "website": website
            }

    return {"error": "Hospital not found"}

# Example usage
api_key = os.environ["gmaps_api_key"]
hospital_name = "Apollo Hospital"
latitude = 12.971598
longitude = 77.594566

contact_info = get_hospital_contact_info(api_key, hospital_name, latitude, longitude)
print(contact_info)
