def getUrlfromData(data):
    try:
        # Ensure `data` is a dictionary and navigate to the patients list
        patients = data.get("patients", [])
        for patient in patients:
            # Get the entries in the bundle
            entries = patient.get("bundle", {}).get("entry", [])
            for entry in entries:
                # Get the resource and navigate to the URL
                resource = entry.get("resource", {})
                content = resource.get("content", [])
                if content:
                    attachment = content[0].get("attachment", {})
                    url = attachment.get("url", "")
                    if url:
                        return {"url": url}
        return None  # Return None if no URL is found
    except Exception as e:
        print(f"An error occurred: {e}")
        return None