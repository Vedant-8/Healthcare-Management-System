import axios from "axios";

interface PractitionerData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
}

export const getPractitionerData = async (
  patientId: string,
  webhookType: string
): Promise<PractitionerData[]> => {
  try {
    console.debug(`[getPractitionerData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<PractitionerData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getPractitionerData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getPractitionerData] Error fetching practitioner data:`, error.response || error.message);
    throw error;
  }
};
