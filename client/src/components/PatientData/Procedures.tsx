import React, { useEffect, useState } from "react";
import { getProcedureData } from "../../api/procedureApi";
import procedureFallbackData from "../../../../server/services/webhook/temp_jsons/procedure.json";

interface Performer {
  Name: string;
  Role: string;
}

interface ProcedureData {
  Procedure: string;
  Status: string;
  Performed: string;
  Performer: Performer[];
}

const Procedures: React.FC = () => {
  const [procedures, setProcedures] = useState<ProcedureData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcedureData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Procedure";

      try {
        console.debug(
          `[Procedures] Fetching procedure data for patient ${patientId}`
        );
        const response = await getProcedureData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Procedures] Received procedure data:`, response);
          setProcedures(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Procedures] Error occurred, using fallback data:`, err);
        setProcedures(procedureFallbackData);
        setError("Failed to fetch procedure data. Using fallback data.");
      }
    };

    fetchProcedureData();
  }, []);

  return (
    <div>
      <h1>Procedure Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {procedures ? (
        <div>
          {procedures.map((procedure, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-red-600">{procedure.Procedure}</h3>
              <p>
                <strong>Status:</strong> {procedure.Status}
              </p>
              <p>
                <strong>Performed:</strong>{" "}
                {new Date(procedure.Performed).toLocaleDateString()}
              </p>
              <p>
                <strong>Performer:</strong>{" "}
                {procedure.Performer.map((performer, idx) => (
                  <span key={idx}>
                    {performer.Name} ({performer.Role})
                    {idx < procedure.Performer.length - 1 && ", "}
                  </span>
                ))}
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

export default Procedures;
