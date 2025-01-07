import json
from pathlib import Path



def extract_observations_lab(data):
    observations = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})
                
                # Check for Observation resource type
                if resource.get("resourceType") == "Observation" and resource.get("category", [{}])[0].get("text", "N/A")=="laboratory":
                    # Extract basic details
                    if resource.get("category", [{}])[0].get("text", "N/A")!="N/A":
                        observation = {
                            "Observation Code": resource.get("code", {}).get("text", "N/A"),
                            "Category": resource.get("category", [{}])[0].get("text", "N/A"),
                            "Status": resource.get("status", "N/A"),
                            # "Performer": [
                            #     performer.get("reference", "N/A")
                            #     for performer in resource.get("performer", [])
                            # ],
                            "Value": resource.get("valueQuantity", {}).get("value", resource.get("valueString", "N/A")),
                            "Unit": resource.get("valueQuantity", {}).get("unit", "N/A"),
                            "Reference Range": resource.get("referenceRange", [{}])[0].get("text", "N/A"),
                            "Issued Date": resource.get("issued", "N/A"),
                            "Effective Date": resource.get("effectiveDateTime", "N/A")
                        }
                        observations.append(observation)

    return observations



def extract_observations_vitals(data):
    observations = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})
                
                # Check for Observation resource type
                if resource.get("resourceType") == "Observation" and resource.get("category", [{}])[0].get("text", "N/A")=="vital-signs":
                    # Extract basic details
                    if resource.get("category", [{}])[0].get("text", "N/A")!="N/A":
                        observation = {
                            "Observation Code": resource.get("code", {}).get("text", "N/A"),
                            "Category": resource.get("category", [{}])[0].get("text", "N/A"),
                            "Status": resource.get("status", "N/A"),
                            # "Performer": [
                            #     performer.get("reference", "N/A")
                            #     for performer in resource.get("performer", [])
                            # ],
                            "Value": resource.get("valueQuantity", {}).get("value", resource.get("valueString", "N/A")),
                            "Unit": resource.get("valueQuantity", {}).get("unit", "N/A"),
                            "Reference Range": resource.get("referenceRange", [{}])[0].get("text", "N/A"),
                            "Issued Date": resource.get("issued", "N/A"),
                            "Effective Date": resource.get("effectiveDateTime", "N/A")
                        }
                        observations.append(observation)

    return observations


# Input file path
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path_vitals = Path("server/services/webhook/temp_jsons/observation_vitals.json")
output_file_path_lab = Path("server/services/webhook/temp_jsons/observation_lab.json")

with input_file_path.open("r", encoding="utf-8") as f:
    data = json.load(f)


# Extract allergy data and save it as a JSON file
try:
    vital_info = extract_observations_vitals(data)
    with open(output_file_path_vitals, "w") as outfile:
        json.dump(vital_info, outfile, indent=4)
    print(f"observation data successfully saved to {output_file_path_vitals}")
except Exception as e:
    print(f"Error: {e}")


try:
    lab_info = extract_observations_lab(data)
    with open(output_file_path_lab, "w") as outfile:
        json.dump(lab_info, outfile, indent=4)
    print(f"observation data successfully saved to {output_file_path_lab}")
except Exception as e:
    print(f"Error: {e}")