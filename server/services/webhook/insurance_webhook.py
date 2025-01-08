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
