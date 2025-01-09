import React, { useEffect, useState } from "react";
import { getImmunizationData } from "../../api/immunizationApi";
import immunizationFallbackData from "../../../../server/services/webhook/temp_jsons/Immunization.json";

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

const Immunization: React.FC = () => {
  const [immunizations, setImmunizations] = useState<ImmunizationData[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImmunizationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Immunization";

      try {
        console.debug(
          `[Immunization] Fetching immunization data for patient ${patientId}`
        );
        const response = await getImmunizationData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Immunization] Received immunization data:`, response);
          setImmunizations(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(
          `[Immunization] Error occurred, using fallback data:`,
          err
        );
        setImmunizations(immunizationFallbackData);
        setError("Failed to fetch immunization data. Using fallback data.");
      }
    };

    fetchImmunizationData();
  }, []);

  return (
    <div>
      <h1>Immunization Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {immunizations ? (
        <div>
          {immunizations.map((immunization, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-blue-600">
                {immunization.vaccineCode.text}
              </h3>
              <p>
                <strong>Status:</strong> {immunization.status}
              </p>
              <p>
                <strong>Occurrence Date:</strong>{" "}
                {new Date(immunization.occurrenceDateTime).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(immunization.lastUpdated).toLocaleString()}
              </p>
              <p>
                <strong>Vaccine Code:</strong> {immunization.vaccineCode.code}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Immunization;
