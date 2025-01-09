import axios from "axios";

interface ProcedureData {
  Procedure: string;
  Status: string;
  Performed: string;
  Performer: Array<{
    Name: string;
    Role: string;
  }>;
}

export const getProcedureData = async (
  patientId: string,
  webhookType: string
): Promise<ProcedureData[]> => {
  try {
    console.debug(`[getProcedureData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<ProcedureData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getProcedureData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getProcedureData] Error fetching procedure data:`, error.response || error.message);
    throw error;
  }
};
