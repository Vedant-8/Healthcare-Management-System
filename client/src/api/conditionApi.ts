import axios from "axios";

interface ConditionData {
  Condition: string;
  Status: string;
  Code: string;
  CodeType: string;
  display: string;
  FirstSeen: string;
  LastSeen: string;
}

export const getConditionData = async (
  patientId: string,
  webhookType: string
): Promise<ConditionData[]> => {
  try {
    console.debug(
      `[getConditionData] Fetching data for patient ${patientId} and webhook type ${webhookType}`
    );
    const response = await axios.get<ConditionData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(
      `[getConditionData] Data fetched successfully`,
      response.data
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `[getConditionData] Error fetching condition data:`,
      error.response || error.message
    );
    throw error;
  }
};
