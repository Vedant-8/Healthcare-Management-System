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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "MedicationStatement";
      try {
        console.debug(
          `[Medications] Fetching medication data for patient ${patientId}`
        );
        const response = await getMedicationStatementData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Medications] Received medication data:`, response);
          setMedications(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Medications] Error occurred, using fallback data:`, err);
        setMedications(medicationStatementFallbackData);
        setError("Failed to fetch medication data. Using fallback data.");
      }
    };

    fetchMedicationData();
  }, []);

  return (
    <div>
      <h1>Medication Statement Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {medications ? (
        <div>
          {medications.map((medication, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-red-600">{medication.Medication}</h3>
              <p><strong>ID:</strong> {medication.id}</p>
              <p><strong>Code:</strong> {medication.Code}</p>
              <p><strong>Last Updated:</strong> {new Date(medication.lastUpdated).toLocaleDateString()}</p>
              <p><strong>Dosage:</strong> {medication.dosage}</p>
              <p><strong>Route:</strong> {medication.route}</p>
              <p><strong>Value:</strong> {medication.value}</p>
              <p><strong>Unit:</strong> {medication.unit}</p>
              <p><strong>Status:</strong> {medication.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Medications;
