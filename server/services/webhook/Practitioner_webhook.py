import json
from pathlib import Path



def extract_practitioner_data(data):
    practitioners = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})

                # Check for Practitioner resource type
                if resource.get("resourceType") == "Practitioner":
                    practitioner = {
                        "Full URL": entry.get("fullUrl", "N/A"),
                        "ID": resource.get("id", "N/A"),
                        "Last Updated": resource.get("meta", {}).get("lastUpdated", "N/A"),
                        "Name": f'{resource.get("name", [{}])[0].get("given", " ")[0]} {resource.get("name", [{}])[0].get("family", " ")}',
    
                       
                        # "Identifiers": [
                        #     {
                        #         "Use": identifier.get("use", "N/A"),
                        #         "Value": identifier.get("value", "N/A"),
                        #         "System": identifier.get("system", "N/A"),
                        #     }
                        #     for identifier in resource.get("identifier", [])
                        # ],
                        # "Extensions": [
                        #     {
                        #         "URL": extension.get("url", "N/A"),
                        #         "Value": extension.get("valueString", "N/A"),
                        #     }
                        #     for extension in resource.get("extension", [])
                        # ],
                    }
                    practitioners.append(practitioner)

    return practitioners






input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/Practitioner.json")
with input_file_path.open("r", encoding="utf-8") as f:
    data = json.load(f)

try:
    lab_info = extract_practitioner_data(data)
    with open(output_file_path, "w") as outfile:
        json.dump(lab_info, outfile, indent=4)
    print(f"Practitioner data successfully saved to {output_file_path}")
except Exception as e:
    print(f"Error: {e}")