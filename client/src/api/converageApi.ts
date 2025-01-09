import axios from "axios";

interface CoverageData {
  patientId: string;
  coverageId: string;
  status: string;
  payor: string;
  identifier: string;
  relationship: string;
  lastUpdated: string;
}

interface OrganizationData {
  organizationId: string;
  name: string;
  address: string;
}

export const getCoverageData = async (
  patientId: string,
  webhookType: string
): Promise<CoverageData[] | OrganizationData[]> => {
  try {
    console.debug(`[getCoverageData] Fetching data for patient ${patientId} and webhook type ${webhookType}`);
    const response = await axios.get<CoverageData[] | OrganizationData[]>(
      `http://localhost:8050/redis/data`,
      {
        params: { patient_id: patientId, webhook_type: webhookType },
      }
    );
    console.debug(`[getCoverageData] Data fetched successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[getCoverageData] Error fetching coverage data:`, error.response || error.message);
    throw error;
  }
};
