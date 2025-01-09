import React, { useEffect, useState } from "react";
import { getImmunizationData } from "../../api/immunizationApi";

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

const ImmunizationTestingApi: React.FC = () => {
  const [immunizations, setImmunizations] = useState<ImmunizationData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImmunizationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Immunization";
      try {
        console.debug(`[ImmunizationTestingApi] Fetching immunization data for patient ${patientId}`);
        const response = await getImmunizationData(patientId, webhookType);
        console.debug(`[ImmunizationTestingApi] Received immunization data:`, response);
        setImmunizations(response);
      } catch (err) {
        console.error(`[ImmunizationTestingApi] Error occurred:`, err);
        setError("Failed to fetch immunization data");
      }
    };

    fetchImmunizationData();
  }, []);

  return (
    <div>
      <h1>Test Immunization API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {immunizations ? (
        <div>
          {immunizations.map((immunization, index) => (
            <div key={index}>
              <p><strong>Vaccine:</strong> {immunization.vaccineCode.text}</p>
              <p><strong>Status:</strong> {immunization.status}</p>
              <p><strong>Occurrence Date:</strong> {new Date(immunization.occurrenceDateTime).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(immunization.lastUpdated).toLocaleString()}</p>
              <p><strong>Vaccine Code:</strong> {immunization.vaccineCode.code}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImmunizationTestingApi;
