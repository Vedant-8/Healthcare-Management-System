headers_cred="fsq376OtL9swqXJ7vB+CDGimt8Pdj0rIavqB9rjgoWDhXm4="


import requests

search_url = "https://api.foursquare.com/v3/places/search"

headers = {
    "accept": "application/json",
    "Authorization": "fsq376OtL9swqXJ7vB+CDGimt8Pdj0rIavqB9rjgoWDhXm4="
}

params={
    "query": "hospital",
}

response = requests.get(search_url, headers=headers, params=params)

print(response.text)



