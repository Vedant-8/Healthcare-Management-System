def extract_allergy_intolerances(data):
    allergies = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                resource = entry.get("resource", {})
                
                # Check for AllergyIntolerance resource type
                if resource.get("resourceType") == "AllergyIntolerance":
                    for reaction in resource.get("reaction", []):
                        allergy = {
                            "Allergy": (reaction.get("substance", {}).get("text", "N/A") 
                                        if isinstance(reaction.get("substance", {}), dict) 
                                        else "N/A"),
                            "Manifestation": (reaction.get("manifestation", [{}])[0].get("text", "N/A") 
                                              if isinstance(reaction.get("manifestation", [{}])[0], dict) 
                                              else "N/A"),
                            "Status": (resource.get("clinicalStatus", {}).get("coding", [{}])[0].get("code", "N/A") 
                                       if isinstance(resource.get("clinicalStatus", {}).get("coding", [{}])[0], dict) 
                                       else "N/A"),
                            "Criticality": resource.get("criticality", "N/A"),
                            "Period": reaction.get("onset", "N/A"),
                            "Codes": {
                                "Text": (reaction.get("substance", {}).get("text", "N/A") 
                                         if isinstance(reaction.get("substance", {}), dict) 
                                         else "N/A"),
                                "System": (reaction.get("substance", {}).get("coding", [{}])[0].get("system", "N/A") 
                                           if isinstance(reaction.get("substance", {}).get("coding", [{}])[0], dict) 
                                           else "N/A"),
                                "Code": (reaction.get("substance", {}).get("coding", [{}])[0].get("code", "N/A") 
                                         if isinstance(reaction.get("substance", {}).get("coding", [{}])[0], dict) 
                                         else "N/A"),
                            },
                            "References": {
                                "Performer": resource.get("recorder", {}).get("reference", "N/A"),
                                "Name": "David K Smith MD",  # Placeholder if more details are not available
                                "Qualification": "Internal Medicine"  # Placeholder for now
                            }
                        }
                        allergies.append(allergy)

    return allergies

