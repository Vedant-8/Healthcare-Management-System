import json
from pathlib import Path

def extract_medication_statements(data):
    medication_statements = []
    
    # Extract medication statements from the data
    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})
                # Check for Medication resource type
                if resource.get("resourceType") == "Medication":
                    medication_statement = {
                        "Medication": resource.get("code", {}).get("text", "N/A"),
                        "id": resource.get("id", "N/A"),
                        "Code": resource.get("code", {}).get("coding", [0])[0].get("code", "N/A"),
                        "lastUpdated": resource.get("meta", {}).get("lastUpdated", "N/A"),
                       
                    }
                    medication_statements.append(medication_statement)

    return medication_statements

def join_medicine_data(data):
    file_path = Path("server/services/webhook/temp_jsons/medication_statement.json")
    
    # Load the previously extracted medication data
    with file_path.open("r", encoding="utf-8") as f:
        prev_data = json.load(f)
    
    cnt = 0
    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})

                if resource.get("resourceType") == "MedicationStatement":
                    # Adding dosage and route information to the previous data
                    prev_data[cnt]["dosage"] = resource.get("dosage", [0])[0].get("text", 'N/A')
                    prev_data[cnt]["route"] = resource.get("dosage", [0])[0].get("route", {}).get("text", "N/A")
                    
                    # Adding dose and rate values to the previous data
                    if resource.get("dosage", [0])[0].get("doseAndRate", False):
                        prev_data[cnt]["value"] = resource.get("dosage", [0])[0].get("doseAndRate", [0])[0].get("doseQuantity", {}).get("value", "N/A")
                        prev_data[cnt]["unit"] = resource.get("dosage", [0])[0].get("doseAndRate", [0])[0].get("doseQuantity", {}).get("unit", "N/A")
                    else:
                        prev_data[cnt]["value"] = ""
                        prev_data[cnt]["unit"] = ""
                    
                    prev_data[cnt]["status"]=resource.get("status", "N/A")

                    cnt += 1
                    if cnt >= len(prev_data):
                        break  # Avoid index errors if there are fewer records than expected

    return prev_data

# File paths for input and output JSON files
input_file_path = Path("server/services/webhook/webhook_db.json")
output_file_path = Path("server/services/webhook/temp_jsons/medication_statement.json")

# Read the input JSON file and process the medication statement data
try:
    with input_file_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    # Extract medication statement data
    prev_medication_info = extract_medication_statements(data)
    
    # Join additional medication data
    medication_info = join_medicine_data(data)
    
    # Write the updated medication data to the output file
    with output_file_path.open("w", encoding="utf-8") as outfile:
        json.dump(medication_info, outfile, indent=4)

    print(f"Medication statement data successfully saved to {output_file_path}")
    
except FileNotFoundError:
    print(f"Error: The file at {input_file_path} was not found.")
except json.JSONDecodeError:
    print("Error: Failed to decode JSON from the input file.")
except Exception as e:
    print(f"Error: {e}")
