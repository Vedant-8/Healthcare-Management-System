import axios from "axios";

// Base URL for the FHIR server
const FHIR_BASE_URL = "http://localhost:8080/fhir"; // Replace with your HAPI FHIR server URL

// Default Headers for FHIR requests
const HEADERS = {
  "Content-Type": "application/fhir+json",
  Accept: "application/fhir+json",
};

// Helper function to handle API errors
const handleApiError = (error: any) => {
  if (error.response) {
    console.error("Error:", error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
};

// 1. Create a Patient
export const createPatient = async (data: {
  familyName: string;
  givenName: string;
  gender: string;
  birthDate: string;
}) => {
  const patientData = {
    resourceType: "Patient",
    name: [
      {
        use: "official",
        family: data.familyName,
        given: [data.givenName],
      },
    ],
    gender: data.gender,
    birthDate: data.birthDate,
  };

  try {
    const response = await axios.post(`${FHIR_BASE_URL}/Patient`, patientData, {
      headers: HEADERS,
    });
    console.log("Patient created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 2. Create a Doctor (Practitioner)
export const createDoctor = async (data: {
  familyName: string;
  givenName: string;
  qualification: string;
  gender: string;
}) => {
  const doctorData = {
    resourceType: "Practitioner",
    name: [
      {
        use: "official",
        family: data.familyName,
        given: [data.givenName],
      },
    ],
    gender: data.gender,
    qualification: [
      {
        identifier: {
          system: "http://hl7.org/fhir/sid/us-npi",
          value: "1234567890", // Replace with actual identifier if needed
        },
        code: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/practitioner-role",
              code: "doctor",
              display: data.qualification,
            },
          ],
        },
      },
    ],
  };

  try {
    const response = await axios.post(
      `${FHIR_BASE_URL}/Practitioner`,
      doctorData,
      {
        headers: HEADERS,
      }
    );
    console.log("Doctor created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 3. Create an Appointment
export const createAppointment = async (
  patientId: string,
  doctorId: string,
  description: string,
  start: string,
  end: string
) => {
  const appointmentData = {
    resourceType: "Appointment",
    status: "proposed",
    description,
    start,
    end,
    participant: [
      {
        actor: {
          reference: `Practitioner/${doctorId}`,
        },
        status: "accepted",
      },
      {
        actor: {
          reference: `Patient/${patientId}`,
        },
        status: "accepted",
      },
    ],
  };

  try {
    const response = await axios.post(
      `${FHIR_BASE_URL}/Appointment`,
      appointmentData,
      {
        headers: HEADERS,
      }
    );
    console.log("Appointment created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 4. Read a Resource (Patient, Doctor, or Appointment)
export const readResource = async (
  resourceType: string,
  resourceId: string
) => {
  try {
    const response = await axios.get(
      `${FHIR_BASE_URL}/${resourceType}/${resourceId}`,
      {
        headers: HEADERS,
      }
    );
    console.log(`${resourceType} fetched:`, response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 5. Update a Resource (Patient, Doctor, or Appointment)
export const updateResource = async (
  resourceType: string,
  resourceId: string,
  updatedData: object
) => {
  try {
    const response = await axios.put(
      `${FHIR_BASE_URL}/${resourceType}/${resourceId}`,
      updatedData,
      {
        headers: HEADERS,
      }
    );
    console.log(`${resourceType} updated:`, response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 6. Delete a Resource (Patient, Doctor, or Appointment)
export const deleteResource = async (
  resourceType: string,
  resourceId: string
): Promise<void> => {
  try {
    await axios.delete(`${FHIR_BASE_URL}/${resourceType}/${resourceId}`, {
      headers: HEADERS,
    });
    console.log(`${resourceType}/${resourceId} deleted successfully.`);
  } catch (error) {
    handleApiError(error);
  }
};
