import axios from "axios";

interface HospitalData {
  fsq_id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string | null;
  locality: string | null;
  region: string | null;
  postcode: string | null;
  country: string;
  formatted_address: string;
  "phone number": string;
  email: string;
  categories: string;
  link: string;
}

interface NearbyHospitalsResponse {
  top_5_hospitals: HospitalData[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8050";

export const getNearbyHospitals = async (
  latitude: number,
  longitude: number,
  radius: number = 5000
): Promise<HospitalData[]> => {
  try {
    console.debug(`[getNearbyHospitals] Initiating API call with coordinates: (${latitude}, ${longitude}), radius: ${radius} meters`);
    const response = await axios.get<NearbyHospitalsResponse>(
      `${API_BASE_URL}/api/nearby_hospitals`,
      {
        params: {
          radius,
          Latitude: latitude,
          Longitude: longitude,
        },
      }
    );
    console.debug(`[getNearbyHospitals] API call successful. Response:`, response.data);
    return response.data.top_5_hospitals;
  } catch (error: any) {
    console.error(`[getNearbyHospitals] Error fetching nearby hospitals:`, error.response || error.message);
    throw error;
  }
};
