import React, { useEffect, useState } from "react";
import { getConditionData } from "../../api/conditionApi";
import conditionFallbackData from "../../../../server/services/webhook/temp_jsons/conditions.json";

interface ConditionData {
  Condition: string;
  Status: string;
  Code: string;
  CodeType: string;
  display: string;
  FirstSeen: string;
  LastSeen: string;
}

const Condition: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConditionData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Condition";

      try {
        console.debug(`[Condition] Fetching condition data for patient ${patientId}`);
        const response = await getConditionData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Condition] Received condition data:`, response);
          setConditions(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Condition] Error occurred, using fallback data:`, err);
        setConditions(conditionFallbackData);
        setError("Failed to fetch condition data. Using fallback data.");
      }
    };

    fetchConditionData();
  }, []);

  return (
    <div>
      <h1>Condition Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {conditions ? (
        <div>
          {conditions.map((condition, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-red-600">{condition.Condition}</h3>
              <p><strong>Status:</strong> {condition.Status}</p>
              <p><strong>Code:</strong> {condition.Code}</p>
              <p><strong>Code Type:</strong> {condition.CodeType}</p>
              <p><strong>Display:</strong> {condition.display}</p>
              <p><strong>First Seen:</strong> {new Date(condition.FirstSeen).toLocaleDateString()}</p>
              <p><strong>Last Seen:</strong> {new Date(condition.LastSeen).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Condition;
