def extract_related_person_data(data):
    related_persons = []

    for record in data:
        for patient in record.get("patients", []):
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                resource = entry.get("resource", {})

                # Check for RelatedPerson resource type
                if resource.get("resourceType") == "RelatedPerson":
                    address_data = resource.get("address", [{}])[0]
                    formatted_address = ", ".join(
                        filter(
                            None,
                            [
                                ", ".join(address_data.get("line", [])),
                                address_data.get("city"),
                                address_data.get("state"),
                                address_data.get("country"),
                            ],
                        )
                    )
                    formatted_address += f" - {address_data.get('postalCode', '')}" if address_data.get("postalCode") else ""

                    related_person = {
                        "Full URL": entry.get("fullUrl", "N/A"),
                        "ID": resource.get("id", "N/A"),
                        "Last Updated": resource.get("meta", {}).get("lastUpdated", "N/A"),
                        "Name": resource.get("name", [{}])[0].get("text", "N/A"),
                        "Address": formatted_address,
                        #"Patient Reference": resource.get("patient", {}).get("reference", "N/A"),
                        "Telecom": [
                            {
                                "Use": telecom.get("use", "N/A"),
                                "Value": telecom.get("value", "N/A"),
                                "System": telecom.get("system", "N/A"),
                            }
                            for telecom in resource.get("telecom", [])
                        ],
                        # "Extensions": [
                        #     {
                        #         "URL": extension.get("url", "N/A"),
                        #         "Value": extension.get("valueString", "N/A"),
                        #     }
                        #     for extension in resource.get("extension", [])
                        # ],
                        "Relationship": resource.get("relationship",{})[0].get("text", "N/A"),
                    }
                    related_persons.append(related_person)

    return related_persons

