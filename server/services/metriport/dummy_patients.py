import requests
import os 

x_api_key=os.environ["metri_port_api_key"]
facilityId="0194370c-bdfc-7b80-84d7-d75fcfc566db"

url = "https://api.sandbox.metriport.com/medical/v1/patient"

payload = {
  "firstName": "Andreas",
  "lastName": "Sims",
  "dob": "1952-01-01",
  "genderAtBirth": "M",
  "address": [
    {
      "addressLine1": "4430 York St",
      "city": "Jefferson City",
      "state": "MO",
      "zip": "64000",
      "country": "USA"
    }
  ]
}


headers = {
    "x-api-key": x_api_key,
    "Content-Type": "application/json"
}

query={
    "facilityId":facilityId,
}

response = requests.request("POST", url, params=query, json=payload, headers=headers)

print(response.text)