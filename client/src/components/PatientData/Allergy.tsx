import React, { useEffect, useState } from "react";
import { getAllergyData } from "../../api/allergyApi";
import allergyFallbackData from "../../../../server/services/webhook/temp_jsons/allergy.json";

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

const Allergy: React.FC = () => {
  const [allergies, setAllergies] = useState<AllergyData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllergyData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "AllergyIntolerance";

      try {
        console.debug(
          `[Allergy] Fetching allergy data for patient ${patientId}`
        );
        const response = await getAllergyData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Allergy] Received allergy data:`, response);
          setAllergies(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Allergy] Error occurred, using fallback data:`, err);
        setAllergies(allergyFallbackData);
        setError("Failed to fetch allergy data. Using fallback data.");
      }
    };

    fetchAllergyData();
  }, []);

  return (
    <div>
      <h1>Allergy Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {allergies ? (
        <div>
          {allergies.map((allergy, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-red-600">{allergy.Allergy}</h3>
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
                <strong>Period:</strong>{" "}
                {new Date(allergy.Period).toLocaleDateString()}
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

export default Allergy;
