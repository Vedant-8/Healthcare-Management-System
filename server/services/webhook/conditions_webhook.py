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
