import React, { useEffect, useState } from "react";
import { getConditionData } from "../../api/conditionApi";

interface ConditionData {
  Condition: string;
  Status: string;
  Code: string;
  CodeType: string;
  display: string;
  FirstSeen: string;
  LastSeen: string;
}

const ConditionTestingApi: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConditionData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Condition";
      try {
        console.debug(`[ConditionTestingApi] Fetching condition data for patient ${patientId}`);
        const response = await getConditionData(patientId, webhookType);
        console.debug(`[ConditionTestingApi] Received condition data:`, response);
        setConditions(response);
      } catch (err) {
        console.error(`[ConditionTestingApi] Error occurred:`, err);
        setError("Failed to fetch condition data");
      }
    };

    fetchConditionData();
  }, []);

  return (
    <div>
      <h1>Test Condition Data API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {conditions ? (
        <div>
          {conditions.map((condition, index) => (
            <div key={index}>
              <h3>{condition.Condition}</h3>
              <p><strong>Status:</strong> {condition.Status}</p>
              <p><strong>Code:</strong> {condition.Code}</p>
              <p><strong>Code Type:</strong> {condition.CodeType}</p>
              <p><strong>Display:</strong> {condition.display}</p>
              <p><strong>First Seen:</strong> {condition.FirstSeen}</p>
              <p><strong>Last Seen:</strong> {condition.LastSeen}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConditionTestingApi;
