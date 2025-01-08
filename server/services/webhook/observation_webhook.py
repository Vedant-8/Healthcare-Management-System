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
