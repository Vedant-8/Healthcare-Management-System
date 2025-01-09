import axios from "axios";

// Observation data types for both laboratory and vital signs
interface ObservationData {
  "Observation Code": string;
  Category: string;
  Status: string;
  Value: number;
  Unit: string;
  "Reference Range": string;
  "Issued Date": string;
  "Effective Date": string;
}

export const getObservationData = async (
  patientId: string,
  webhookType: string
): Promise<{
  labObservations: ObservationData[];
  vitalObservations: ObservationData[];
}> => {
  try {
    console.debug(
      `[getObservationData] Fetching data for patient ${patientId} and webhook type ${webhookType}`
    );
    const response = await axios.get<any>(`http://localhost:8050/redis/data`, {
      params: { patient_id: patientId, webhook_type: webhookType },
    });
    console.debug(
      `[getObservationData] Data fetched successfully`,
      response.data
    );

    // Separate the data into lab and vital observations
    const labObservations = response.data.filter(
      (item: any) => item.Category === "laboratory"
    );
    const vitalObservations = response.data.filter(
      (item: any) => item.Category === "vital-signs"
    );

    return { labObservations, vitalObservations };
  } catch (error: any) {
    console.error(
      `[getObservationData] Error fetching observation data:`,
      error.response || error.message
    );
    throw error;
  }
};
