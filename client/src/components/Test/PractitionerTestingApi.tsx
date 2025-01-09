import React, { useEffect, useState } from "react";
import { getPractitionerData } from "../../api/practitionerApi";

interface PractitionerData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
}

const PractitionerTestingApi: React.FC = () => {
  const [practitioners, setPractitioners] = useState<PractitionerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPractitionerData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Practitioner";
      try {
        console.debug(`[PractitionerTestingApi] Fetching practitioner data for patient ${patientId}`);
        const response = await getPractitionerData(patientId, webhookType);
        console.debug(`[PractitionerTestingApi] Received practitioner data:`, response);
        setPractitioners(response);
      } catch (err) {
        console.error(`[PractitionerTestingApi] Error occurred:`, err);
        setError("Failed to fetch practitioner data");
      }
    };

    fetchPractitionerData();
  }, []);

  return (
    <div>
      <h1>Test Practitioner API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {practitioners ? (
        <div>
          {practitioners.map((practitioner, index) => (
            <div key={index}>
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

export default PractitionerTestingApi;
