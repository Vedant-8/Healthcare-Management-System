import json
from pathlib import Path

# def extract_coverage_info(data):
#     insurance = []

#     for record in data:
#         for patient in record.get("patients", []):
#             entries = patient.get("bundle", {}).get("entry", [])
#             for entry in entries[1:]:
#                 resource = entry.get("resource", {})
#                 print(resource)
#                 # Check for AllergyIntolerance resource type
#                 if resource.get("resourceType") == "Organization":
#                     address=resource.get("address")
#                     line = ", ".join(address.get("line", []))  # Join multiple lines with a comma
#                     city = address.get("city", "")
#                     state = address.get("state", "")
#                     postal_code = address.get("postalCode", "")
    
#                     # Combine them into a formatted string
#                     formatted_address = f"{line}, {city}, {state} {postal_code}"
                    
#                     insurance_row={
#                         "id": resource.get("id","N/A"),
#                         "name":resource.get("name","N/A"),
#                         "address":formatted_address,
                        
#                         # "Allergy": reaction.get("substance", {}).get("text", "N/A"),
#                         # "Manifestation": reaction.get("manifestation", [{}])[0].get("text", "N/A"),
#                         # "Status": resource.get("clinicalStatus", {}).get("coding", [{}])[0].get("code", "N/A"),
#                         # "Criticality": resource.get("criticality", "N/A"),
#                         # "Period": reaction.get("onset", "N/A"),
                        
#                         "lastUpdated": resource.get("meta","{}").get("lastUpdated","N/A"),
                        
                    
#                         }
#                     insurance.append(insurance_row)
        
#     return insurance
                        
def extract_insurance_info(data):
    insurance_info = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            patient_id = patient.get("patientId", "N/A")
            
            for entry in entries:
                resource = entry.get("resource", {})
                resource_type = resource.get("resourceType", "")

                if resource_type == "Coverage":
                    coverage_info = {
                        "patientId": patient_id,
                        "coverageId": resource.get("id", "N/A"),
                        "status": resource.get("status", "N/A"),
                        "payor": resource.get("payor", [{}])[0].get("reference", "N/A"),
                        "identifier": resource.get("identifier", [{}])[0].get("value", "N/A"),
                        "relationship": resource.get("relationship", {}).get("text", "N/A"),
                        "lastUpdated": resource.get("meta", {}).get("lastUpdated", "N/A"),
                    }
                    insurance_info.append(coverage_info)
                
                if resource_type == "Organization":
                    organization_info = {
                        "organizationId": resource.get("id", "N/A"),
                        "name": resource.get("name", "N/A"),
                        "address": ", ".join(resource.get("address", [{}])[0].get("line", [])) + ", " +
                                   resource.get("address", [{}])[0].get("city", "") + ", " +
                                   resource.get("address", [{}])[0].get("state", "") + " " +
                                   resource.get("address", [{}])[0].get("postalCode", "")
                    }
                    insurance_info.append(organization_info)

    return insurance_info


# Input file path
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/insurance.json")


with input_file_path.open("r", encoding="utf-8") as f:
    data = json.load(f)


# Extract allergy data and save it as a JSON file
try:
    allergy_info = extract_insurance_info(data)
    with open(output_file_path, "w") as outfile:
        json.dump(allergy_info, outfile, indent=4)
    print(f"Allergy data successfully saved to {output_file_path}")
except Exception as e:
    print(f"Error: {e}")
