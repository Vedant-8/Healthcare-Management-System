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

  useEffect(() => {
    const fetchProcedureData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Procedure";

      try {
        const response = await getProcedureData(patientId, webhookType);
        if (response && response.length > 0) {
          setProcedures(response);
        } else {
          setProcedures(procedureFallbackData);
        }
      } catch {
        setProcedures(procedureFallbackData);
      }
    };

    fetchProcedureData();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      {procedures ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Procedure</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Performer</th>
              <th className="px-4 py-2 text-left border-b">Performed</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{procedure.Procedure}</td>
                <td
                  className={`px-4 py-2 border-b ${
                    procedure.Status === "completed" ? "bg-green-100" : ""
                  }`}
                >
                  {procedure.Status}
                </td>
                <td className="px-4 py-2 border-b">
                  {procedure.Performer.map((performer, idx) => (
                    <div key={idx}>
                      <p className="font-bold">{performer.Name}</p>
                      <p>{performer.Role}</p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border-b">
                  {new Date(procedure.Performed).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Procedures;
