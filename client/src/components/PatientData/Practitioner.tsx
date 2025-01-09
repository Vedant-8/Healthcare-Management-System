import React, { useEffect, useState } from "react";
import { getPractitionerData } from "../../api/practitionerApi";
import practitionerFallbackData from "../../../../server/services/webhook/temp_jsons/Practitioner.json";

interface PractitionerData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
}

const Practitioner: React.FC = () => {
  const [practitioners, setPractitioners] = useState<PractitionerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPractitionerData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Practitioner";

      try {
        console.debug(`[Practitioner] Fetching practitioner data for patient ${patientId}`);
        const response = await getPractitionerData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Practitioner] Received practitioner data:`, response);
          setPractitioners(response.slice(0, 10)); // Take only the first 10 entries
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Practitioner] Error occurred, using fallback data:`, err);
        setPractitioners(practitionerFallbackData.slice(0, 10)); // Use fallback data, taking only the first 10
        setError("Failed to fetch practitioner data. Using fallback data.");
      }
    };

    fetchPractitionerData();
  }, []);

  return (
    <div>
      <h1>Practitioner Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {practitioners ? (
        <div>
          {practitioners.map((practitioner, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <p><strong>Name:</strong> {practitioner.Name}</p>
              <p><strong>Full URL:</strong> {practitioner["Full URL"]}</p>
              <p><strong>ID:</strong> {practitioner.ID}</p>
              <p><strong>Last Updated:</strong> {new Date(practitioner["Last Updated"]).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Practitioner;
