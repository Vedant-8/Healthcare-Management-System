def extract_immunization_data(data):
    Immunization=[]
    for record in data:
            for patient in record.get("patients", []):
                entries = patient.get("bundle", {}).get("entry", [])
                patient_id = patient.get("patientId", "N/A")
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
