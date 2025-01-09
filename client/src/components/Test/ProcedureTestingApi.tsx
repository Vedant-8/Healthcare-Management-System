import React, { useEffect, useState } from "react";
import { getProcedureData } from "../../api/procedureApi";

interface ProcedureData {
  Procedure: string;
  Status: string;
  Performed: string;
  Performer: Array<{
    Name: string;
    Role: string;
  }>;
}

const ProcedureTestingApi: React.FC = () => {
  const [procedures, setProcedures] = useState<ProcedureData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcedureData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Procedure";
      try {
        console.debug(
          `[ProcedureTestingApi] Fetching procedure data for patient ${patientId}`
        );
        const response = await getProcedureData(patientId, webhookType);
        console.debug(
          `[ProcedureTestingApi] Received procedure data:`,
          response
        );
        setProcedures(response);
      } catch (err) {
        console.error(`[ProcedureTestingApi] Error occurred:`, err);
        setError("Failed to fetch procedure data");
      }
    };

    fetchProcedureData();
  }, []);

  return (
    <div>
      <h1>Test Procedure API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {procedures ? (
        <div>
          {procedures.map((procedure, index) => (
            <div key={index}>
              <p>
                <strong>Procedure:</strong> {procedure.Procedure}
              </p>
              <p>
                <strong>Status:</strong> {procedure.Status}
              </p>
              <p>
                <strong>Performed:</strong> {procedure.Performed}
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

export default ProcedureTestingApi;
