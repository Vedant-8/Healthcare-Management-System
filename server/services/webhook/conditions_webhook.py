import json
from pathlib import Path



def extract_conditions(data):
    conditions = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                resource = entry.get("resource", {})
                
                # Check for Condition resource type
                if resource.get("resourceType") == "Condition":
                    clinicalStatus=resource.get("clinicalStatus", {}).get("coding",False)
                    condition = {
                        "Condition": resource.get("code", {}).get("text", "N/A"),
    
                        "Status": "N/A" if not clinicalStatus else clinicalStatus[0]["code"],
                        
                        
                        
                        "Code":resource.get("code", {}).get("coding", [0])[0]["code"],
                        
                        "CodeType":resource.get("code", {}).get("coding", [0])[0]["system"],
                        
                        "display":resource.get("code", {}).get("coding", [0])[0].get("display","data unavailable"),
                        
                        "FirstSeen":resource.get("onsetPeriod", {}).get("start", "N/A"),
                        "LastSeen":resource.get("onsetPeriod", {}).get("end", "N/A"),
                        
                        
                    
                        # "Verification Status": resource.get("verificationStatus", {}).get("text", "N/A"),
                        # "Severity": resource.get("severity", {}).get("text", "N/A"),
                        # "Onset": resource.get("onset", {}).get("text", "N/A"),
                        # "Abatement": resource.get("abatement", {}).get("text", "N/A"),
                        
                        # "Recorded Date": resource.get("recordedDate", "N/A"),
                        # "Subject": resource.get("subject", {}).get("display", "N/A"),
                        # "Location": [
                        #     body_site.get("text", "N/A")
                        #     for body_site in resource.get("bodySite", [])
                        # ],
                        # "Notes": [
                        #     note.get("text", "N/A")
                        #     for note in resource.get("note", [])
                        # ]
                    }
                    conditions.append(condition)

    return conditions






# Define file paths
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/conditions.json")

# Load the data and extract procedure information
try:
    with input_file_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    # Extract procedure data and save it as a JSON file
    procedures_info = extract_conditions(data)
    with output_file_path.open("w", encoding="utf-8") as outfile:
        json.dump(procedures_info, outfile, indent=4)

    print(f"Procedure data successfully saved to {output_file_path}")

except FileNotFoundError:
    print(f"Error: The input file at {input_file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: There was an issue decoding the JSON in {input_file_path}.")
except Exception as e:
    print(f"Unexpected error: {e}")
