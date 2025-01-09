import requests
import json

# Base URL for the FHIR server
FHIR_BASE_URL = "http://localhost:8080/fhir"  # Replace with your HAPI FHIR server URL

# Headers for FHIR requests
HEADERS = {
    "Content-Type": "application/fhir+json",
    "Accept": "application/fhir+json"
}

# 1. Create a Patient
def create_patient():
    patient_data = {
        "resourceType": "Patient",
        "name": [
            {
                "use": "official",
                "family": "Doe",
                "given": ["John"]
            }
        ],
        "gender": "male",
        "birthDate": "1980-01-01"
    }
    response = requests.post(f"{FHIR_BASE_URL}/Patient", headers=HEADERS, data=json.dumps(patient_data))
    if response.status_code == 201:
        print("Patient created successfully!")
        return response.json()
    else:
        print("Error creating patient:", response.status_code, response.text)
        return None

# 2. Create a Doctor (Practitioner)
def create_doctor():
    doctor_data = {
        "resourceType": "Practitioner",
        "name": [
            {
                "use": "official",
                "family": "Smith",
                "given": ["Dr. John"]
            }
        ],
        "gender": "male",
        "qualification": [
            {
                "identifier": {
                    "system": "http://hl7.org/fhir/sid/us-npi",
                    "value": "1234567890"
                },
                "code": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/practitioner-role",
                            "code": "doctor"
                        }
                    ]
                },
                "period": {
                    "start": "2015-01-01"
                }
            }
        ]
    }
    response = requests.post(f"{FHIR_BASE_URL}/Practitioner", headers=HEADERS, data=json.dumps(doctor_data))
    if response.status_code == 201:
        print("Doctor created successfully!")
        return response.json()
    else:
        print("Error creating doctor:", response.status_code, response.text)
        return None

# 3. Create an Appointment
def create_appointment(patient_id, doctor_id):
    appointment_data = {
        "resourceType": "Appointment",
        "status": "proposed",
        "description": "Consultation with Dr. John Smith",
        "start": "2025-01-05T09:00:00Z",
        "end": "2025-01-05T09:30:00Z",
        "participant": [
            {
                "actor": {
                    "reference": f"Practitioner/{doctor_id}"
                },
                "status": "accepted"
            },
            {
                "actor": {
                    "reference": f"Patient/{patient_id}"
                },
                "status": "accepted"
            }
        ]
    }
    response = requests.post(f"{FHIR_BASE_URL}/Appointment", headers=HEADERS, data=json.dumps(appointment_data))
    if response.status_code == 201:
        print("Appointment created successfully!")
        return response.json()
    else:
        print("Error creating appointment:", response.status_code, response.text)
        return None

# 4. Read a Resource (Patient, Doctor, or Appointment)
def read_resource(resource_type, resource_id):
    response = requests.get(f"{FHIR_BASE_URL}/{resource_type}/{resource_id}", headers=HEADERS)
    if response.status_code == 200:
        print(f"Resource {resource_type}/{resource_id} fetched successfully!")
        return response.json()
    else:
        print(f"Error fetching resource {resource_type}/{resource_id}: ", response.status_code, response.text)
        return None

# 5. Update a Resource (Patient, Doctor, or Appointment)
def update_resource(resource_type, resource_id, update_data):
    response = requests.put(f"{FHIR_BASE_URL}/{resource_type}/{resource_id}", headers=HEADERS, data=json.dumps(update_data))
    if response.status_code == 200:
        print(f"Resource {resource_type}/{resource_id} updated successfully!")
        return response.json()
    else:
        print(f"Error updating resource {resource_type}/{resource_id}: ", response.status_code, response.text)
        return None

# 6. Delete a Resource (Patient, Doctor, or Appointment)
def delete_resource(resource_type, resource_id):
    response = requests.delete(f"{FHIR_BASE_URL}/{resource_type}/{resource_id}", headers=HEADERS)
    if response.status_code == 204:
        print(f"Resource {resource_type}/{resource_id} deleted successfully!")
    else:
        print(f"Error deleting resource {resource_type}/{resource_id}: ", response.status_code, response.text)

# Example CRUD Workflow
if __name__ == "__main__":
    # Step 1: Create a Patient
    patient = create_patient()
    if patient:
        patient_id = patient['id']

        # Step 2: Create a Doctor (Practitioner)
        doctor = create_doctor()
        if doctor:
            doctor_id = doctor['id']

            # Step 3: Create an Appointment
            appointment = create_appointment(patient_id, doctor_id)
            if appointment:
                appointment_id = appointment['id']

                # Step 4: Read the created Appointment
                read_resource("Appointment", appointment_id)

                # Step 5: Update the Appointment (Example: Change status to booked)
                updated_appointment_data = appointment
                updated_appointment_data['status'] = "booked"
                update_resource("Appointment", appointment_id, updated_appointment_data)

                # Step 6: Delete the Appointment
                delete_resource("Appointment", appointment_id)

                # Step 7: Delete the Doctor and Patient (Cleanup)
                delete_resource("Practitioner", doctor_id)
                delete_resource("Patient", patient_id)
