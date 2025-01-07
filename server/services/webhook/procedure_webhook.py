import json
from pathlib import Path


def extract_procedures(data):
    procedures = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                resource = entry.get("resource", {})
                
                # Check for Procedure resource type
                if resource.get("resourceType") == "Procedure":
                    procedure = {
                        "Procedure": resource.get("code", {}).get("text", "N/A"),
                        "Status": resource.get("status", "N/A"),
                        "Performed": resource.get("performedDateTime", "N/A"),
                        "Performer": [
                            {
                                "Name": performer.get("actor", {}).get("display", "David K Smith MD"),
                                "Role": performer.get("function", {}).get("text", "Internal Medicine")
                            }
                            for performer in resource.get("performer", [])
                        ],
                        "Location": resource.get("location", {}).get("display", "N/A"),
                        "Reason": [
                            reason.get("text", "N/A")
                            for reason in resource.get("reasonCode", [])
                        ],
                        "Outcome": resource.get("outcome", {}).get("text", "N/A"),
                        "Note": [
                            note.get("text", "N/A")
                            for note in resource.get("note", [])
                        ]
                    }
                    procedures.append(procedure)

    return procedures


# Define file paths
input_file_path = Path("server/services/webhook/webhook_db.json")  # Assuming this file contains your input JSON data
output_file_path = Path("server/services/webhook/temp_jsons/procedure.json")

# Load the data and extract procedure information
try:
    with input_file_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    # Extract procedure data and save it as a JSON file
    procedures_info = extract_procedures(data)
    with output_file_path.open("w", encoding="utf-8") as outfile:
        json.dump(procedures_info, outfile, indent=4)

    print(f"Procedure data successfully saved to {output_file_path}")

except FileNotFoundError:
    print(f"Error: The input file at {input_file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: There was an issue decoding the JSON in {input_file_path}.")
except Exception as e:
    print(f"Unexpected error: {e}")
