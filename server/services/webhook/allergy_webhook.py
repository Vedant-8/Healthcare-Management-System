import json
from pathlib import Path

# def extract_allergy_info(data):
#     # Extract allergy info from the parsed JSON data
#     allergy_info = []
#     for item in data:
#         for patient in item.get("patients", []):
#             for entry in patient.get("bundle", {}).get("entry", []):
#                 resource = entry.get("resource", {})
#                 content = resource.get("content", [])
#                 for c in content:
#                     attachment = c.get("attachment", {})
#                     allergy_info.append({
#                         "url": attachment.get("url"),
#                         "contentType": attachment.get("contentType"),
#                         "patientReference": resource.get("subject", {}).get("reference")
#                     })
#     return allergy_info
# def extract_allergy_details(data):
#     allergy_list = []
    
#     for item in data:
#         for patient in item.get("patients", []):
#             # entries = patient.get("bundle", {}).get("entry", [])
#             # for entry in entries:
#             #     resource = entry.get("resource", {})
                
#             #     # Filter "AllergyIntolerance" or related information
#             #     if resource.get("resourceType") == "AllergyIntolerance":
#             #         allergy_info = {
#             #             "Allergy": resource.get("code", {}).get("text", "N/A"),
#             #             "Manifestation": resource.get("reaction", [{}])[0].get("manifestation", [{}])[0].get("text", "N/A"),
#             #             "Status": resource.get("clinicalStatus", {}).get("text", "N/A"),
#             #             "Criticality": resource.get("criticality", "N/A"),
#             #             "Period": resource.get("recordedDate", "N/A"),
#             #             "Codes": {
#             #                 "Text": resource.get("code", {}).get("text", "N/A"),
#             #                 "System": resource.get("code", {}).get("coding", [{}])[0].get("system", "N/A"),
#             #                 "Code": resource.get("code", {}).get("coding", [{}])[0].get("code", "N/A"),
#             #             },
#             #             "References": {
#             #                 "Performer": resource.get("asserter", {}).get("display", "N/A"),
#             #                 "Name": "N/A",  # Placeholder if additional details are needed
#             #                 "Qualification": "N/A",  # Placeholder if additional details are needed
#             #             }
#             #         }
#             #         allergy_list.append(allergy_info)
#             # print(len(patient.get("bundle")["entry"]
#             #       )
#             res=patient.get("bundle")["entry"]
#     allergy_list.append(res)
            
    
#     return allergy_list



def extract_allergy_intolerances(data):
    allergies = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                resource = entry.get("resource", {})
                
                # Check for AllergyIntolerance resource type
                if resource.get("resourceType") == "AllergyIntolerance":
                    for reaction in resource.get("reaction", []):
                        allergy = {
                            "Allergy": reaction.get("substance", {}).get("text", "N/A"),
                            "Manifestation": reaction.get("manifestation", [{}])[0].get("text", "N/A"),
                            "Status": resource.get("clinicalStatus", {}).get("coding", [{}])[0].get("code", "N/A"),
                            "Criticality": resource.get("criticality", "N/A"),
                            "Period": reaction.get("onset", "N/A"),
                            "Codes": {
                                "Text": reaction.get("substance", {}).get("text", "N/A"),
                                "System": reaction.get("substance", {}).get("coding", [{}])[0].get("system", "N/A"),
                                "Code": reaction.get("substance", {}).get("coding", [{}])[0].get("code", "N/A"),
                            },
                            "References": {
                                "Performer": resource.get("recorder", {}).get("reference", "N/A"),
                                "Name": "N/A",  # Placeholder if more details are not available
                                "Qualification": "N/A"  # Placeholder for now
                            }
                        }
                        allergies.append(allergy)

    return allergies

# Input file path
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/allergy.json")


with input_file_path.open("r", encoding="utf-8") as f:
    data = json.load(f)


# Extract allergy data and save it as a JSON file
try:
    allergy_info = extract_allergy_intolerances(data)
    with open(output_file_path, "w") as outfile:
        json.dump(allergy_info, outfile, indent=4)
    print(f"Allergy data successfully saved to {output_file_path}")
except Exception as e:
    print(f"Error: {e}")
