import React, { useEffect, useState } from "react";
import { getMedicationStatementData } from "../../api/medicationStatementApi";
import medicationStatementFallbackData from "../../../../server/services/webhook/temp_jsons/medication_statement.json";

interface MedicationStatementData {
  Medication: string;
  id: string;
  Code: string;
  lastUpdated: string;
  dosage: string;
  route: string;
  value: string | number;
  unit: string;
  status: string;
}

const Medications: React.FC = () => {
  const [medications, setMedications] = useState<MedicationStatementData[] | null>(null);

  useEffect(() => {
    const fetchMedicationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "MedicationStatement";
      try {
        const response = await getMedicationStatementData(patientId, webhookType);
        if (response && response.length > 0) {
          setMedications(response);
        } else {
          setMedications(medicationStatementFallbackData);
        }
      } catch {
        setMedications(medicationStatementFallbackData);
      }
    };

    fetchMedicationData();
  }, []);

  return (
    <div className="p-4">
      {/* Medications Table with Color Legend */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-red-600 text-2xl">Medications</h2>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 mr-2"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 mr-2"></div>
            <span>Active</span>
          </div>
        </div>
      </div>

      {medications ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Medication</th>
                <th className="px-4 py-2 text-left border-b">Code</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Dosage</th>
                <th className="px-4 py-2 text-left border-b">Amount</th>
                <th className="px-4 py-2 text-left border-b">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{medication.Medication}</td>
                  <td className="px-4 py-2 border-b">{medication.Code}</td>
                  <td
                    className={`px-4 py-2 border-b ${
                      medication.status === "completed"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {medication.status}
                  </td>
                  <td className="px-4 py-2 border-b">{medication.dosage}</td>
                  <td className="px-4 py-2 border-b">
                    {medication.value} {medication.unit}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(medication.lastUpdated).toLocaleDateString()}
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

export default Medications;
