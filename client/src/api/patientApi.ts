import axios from "axios";

interface Address {
  zip: string;
  city: string;
  state: string;
  country: string;
  addressLine1: string;
}

interface PatientData {
  id: string;
  eTag: string;
  facilityIds: string[];
  externalId: string | null;
  dateCreated: string;
  firstName: string;
  lastName: string;
  dob: string;
  genderAtBirth: string;
  address: Address[];
}

interface GetPatientResponse {
  patientData: PatientData;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8050";

export const getPatient = async (id: string): Promise<GetPatientResponse> => {
  try {
    console.debug(`[getPatient] Initiating API call with ID: ${id}`);
    const response = await axios.get<GetPatientResponse>(
      `${API_BASE_URL}/api/getpatient`,
      {
        params: { id },
      }
    );
    console.debug(`[getPatient] API call successful. Response:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getPatient] Error fetching patient data:`, error.response || error.message);
    throw error;
  }
};
