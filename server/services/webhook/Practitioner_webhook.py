def extract_practitioner_data(data):
    practitioners = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries[1:]:
                resource = entry.get("resource", {})

                # Check for Practitioner resource type
                if resource.get("resourceType") == "Practitioner":
                    practitioner = {
                        "Full URL": entry.get("fullUrl", "N/A"),
                        "ID": resource.get("id", "N/A"),
                        "Last Updated": resource.get("meta", {}).get("lastUpdated", "N/A"),
                        "Name": f'{resource.get("name", [{}])[0].get("given", " ")[0]} {resource.get("name", [{}])[0].get("family", " ")}',
    
                       
                        # "Identifiers": [
                        #     {
                        #         "Use": identifier.get("use", "N/A"),
                        #         "Value": identifier.get("value", "N/A"),
                        #         "System": identifier.get("system", "N/A"),
                        #     }
                        #     for identifier in resource.get("identifier", [])
                        # ],
                        # "Extensions": [
                        #     {
                        #         "URL": extension.get("url", "N/A"),
                        #         "Value": extension.get("valueString", "N/A"),
                        #     }
                        #     for extension in resource.get("extension", [])
                        # ],
                    }
                    practitioners.append(practitioner)

    return practitioners
