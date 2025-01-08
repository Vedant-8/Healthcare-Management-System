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

def join_medicine_data(data, prev_data):
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

