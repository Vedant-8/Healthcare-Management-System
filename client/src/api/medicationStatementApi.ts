import axios from "axios";

interface MedicationStatementData {
  Medication: string;
  id: string;
  Code: string;
  lastUpdated: string;
  dosage: string;
  route: string;
  value: string | number;
  unit: string;
  status: string;
}

export const getMedicationStatementData = async (
  patientId: string,
  webhookType: string
): Promise<MedicationStatementData[]> => {
  try {
    console.debug(`[getMedicationStatementData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<MedicationStatementData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getMedicationStatementData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getMedicationStatementData] Error fetching medication statement data:`, error.response || error.message);
    throw error;
  }
};
