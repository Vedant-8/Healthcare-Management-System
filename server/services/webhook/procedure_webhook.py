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
                        # "Location": resource.get("location", {}).get("display", "N/A"),
                        # "Reason": [
                        #     reason.get("text", "N/A")
                        #     for reason in resource.get("reasonCode", [])
                        # ],
                        # "Outcome": resource.get("outcome", {}).get("text", "N/A"),
                        # "Note": [
                        #     note.get("text", "N/A")
                        #     for note in resource.get("note", [])
                        # ]
                    }
                    procedures.append(procedure)

    return procedures
