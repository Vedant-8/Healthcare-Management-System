import axios from "axios";

interface Telecom {
  Use: string;
  Value: string;
  System: string;
}

interface RelatedPersonData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
  Address: string;
  Telecom: Telecom[];
  Relationship: string;
}

export const getRelatedPersonData = async (
  patientId: string,
  webhookType: string
): Promise<RelatedPersonData[]> => {
  try {
    console.debug(`[getRelatedPersonData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<RelatedPersonData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getRelatedPersonData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getRelatedPersonData] Error fetching related person data:`, error.response || error.message);
    throw error;
  }
};
