import React, { useEffect, useState } from "react";
import { getAllergyData } from "../../api/allergyApi";

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

const AllergyTestingApi: React.FC = () => {
  const [allergies, setAllergies] = useState<AllergyData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllergyData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "AllergyIntolerance";
      try {
        console.debug(
          `[AllergyTestingApi] Fetching allergy data for patient ${patientId}`
        );
        const response = await getAllergyData(patientId, webhookType);
        console.debug(`[AllergyTestingApi] Received allergy data:`, response);
        setAllergies(response);
      } catch (err) {
        console.error(`[AllergyTestingApi] Error occurred:`, err);
        setError("Failed to fetch allergy data");
      }
    };

    fetchAllergyData();
  }, []);

  return (
    <div>
      <h1>Test Allergy Data API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {allergies ? (
        <div>
          {allergies.map((allergy, index) => (
            <div key={index}>
              <h3>{allergy.Allergy}</h3>
              <p>
                <strong>Manifestation:</strong> {allergy.Manifestation}
              </p>
              <p>
                <strong>Status:</strong> {allergy.Status}
              </p>
              <p>
                <strong>Criticality:</strong> {allergy.Criticality}
              </p>
              <p>
                <strong>Period:</strong> {allergy.Period}
              </p>
              <p>
                <strong>Code:</strong> {allergy.Codes.Text} (
                {allergy.Codes.Code})
              </p>
              <p>
                <strong>Performer:</strong> {allergy.References.Name} (
                {allergy.References.Qualification})
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

export default AllergyTestingApi;
