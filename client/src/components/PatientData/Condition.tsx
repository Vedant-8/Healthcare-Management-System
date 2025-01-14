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

  useEffect(() => {
    const fetchConditionData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Condition";

      try {
        const response = await getConditionData(patientId, webhookType);
        if (response && response.length > 0) {
          setConditions(response);
        } else {
          setConditions(conditionFallbackData);
        }
      } catch (err) {
        setConditions(conditionFallbackData);
      }
    };

    fetchConditionData();
  }, []);

  return (
    <div>
      {conditions ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Condition</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Code</th>
                <th className="px-4 py-2 text-left border-b">Code Type</th>
                <th className="px-4 py-2 text-left border-b">First Seen</th>
                <th className="px-4 py-2 text-left border-b">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((condition, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{condition.Condition}</td>
                  <td
                    className={`px-4 py-2 border-b ${
                      condition.Status === "resolved" ? "bg-green-200" : ""
                    }`}
                  >
                    {condition.Status}
                  </td>
                  <td className="px-4 py-2 border-b">{condition.Code}</td>
                  <td className="px-4 py-2 border-b">{condition.CodeType}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(condition.FirstSeen).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(condition.LastSeen).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Condition;
