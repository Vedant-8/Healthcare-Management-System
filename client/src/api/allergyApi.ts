import axios from "axios";

interface Code {
  Text: string;
  System: string;
  Code: string;
}

interface Reference {
  Performer: string;
  Name: string;
  Qualification: string;
}

interface AllergyData {
  Allergy: string;
  Manifestation: string;
  Status: string;
  Criticality: string;
  Period: string;
  Codes: Code;
  References: Reference;
}

export const getAllergyData = async (
  patientId: string,
  webhookType: string
): Promise<AllergyData[]> => {
  try {
    console.debug(`[getAllergyData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<AllergyData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getAllergyData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getAllergyData] Error fetching allergy data:`, error.response || error.message);
    throw error;
  }
};
