import axios from "axios";

interface VaccineCode {
  text: string;
  code: string;
  display: string;
  system: string;
}

interface ImmunizationData {
  id: string;
  status: string;
  lastUpdated: string;
  vaccineCode: VaccineCode;
  occurrenceDateTime: string;
}

export const getImmunizationData = async (
  patientId: string,
  webhookType: string
): Promise<ImmunizationData[]> => {
  try {
    console.debug(`[getImmunizationData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<ImmunizationData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getImmunizationData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getImmunizationData] Error fetching immunization data:`, error.response || error.message);
    throw error;
  }
};
