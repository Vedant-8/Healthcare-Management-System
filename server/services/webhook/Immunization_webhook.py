import json
from pathlib import Path


def extract_immunization_data(data):
    Immunization=[]
    for record in data:
            for patient in record.get("patients", []):
                entries = patient.get("bundle", {}).get("entry", [])
                patient_id = patient.get("patientId", "N/A")
                print(entries)
                for entry in entries[1:]:
                    resource = entry.get("resource", {})
                    #print(resource)
                    
                    resource_type = resource.get("resourceType", "")

                    if resource_type == "Immunization":
                        immuization_row = {
                            "id": resource.get("id"),
                            "status": resource.get("status"),
                            "lastUpdated": resource.get("meta", {}).get("lastUpdated"),
                            "vaccineCode": {
                                "text": resource.get("vaccineCode", {}).get("text"),
                                "code": resource.get("vaccineCode", {}).get("coding", [{}])[0].get("code"),
                                "display": resource.get("vaccineCode", {}).get("coding", [{}])[0].get("display"),
                                "system": resource.get("vaccineCode", {}).get("coding", [{}])[0].get("system"),
                            },
                            "occurrenceDateTime": resource.get("occurrenceDateTime"),
                            
                        }
                        Immunization.append(immuization_row)
    return Immunization


# Input file path
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/Immunization.json")


with input_file_path.open("r", encoding="utf-8") as f:
    data = json.load(f)


# Extract allergy data and save it as a JSON file
try:
    allergy_info = extract_immunization_data(data)
    with open(output_file_path, "w") as outfile:
        json.dump(allergy_info, outfile, indent=4)
    print(f"Immunization data successfully saved to {output_file_path}")
except Exception as e:
    print(f"Error: {e}")
