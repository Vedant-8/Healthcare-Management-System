import React, { useEffect, useState } from "react";
import { getMedicationStatementData } from "../../api/medicationStatementApi";

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

const MedicationStatementTestingApi: React.FC = () => {
  const [medications, setMedications] = useState<MedicationStatementData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "MedicationStatement";
      try {
        console.debug(`[MedicationStatementTestingApi] Fetching medication data for patient ${patientId}`);
        const response = await getMedicationStatementData(patientId, webhookType);
        console.debug(`[MedicationStatementTestingApi] Received medication data:`, response);
        setMedications(response);
      } catch (err) {
        console.error(`[MedicationStatementTestingApi] Error occurred:`, err);
        setError("Failed to fetch medication data");
      }
    };

    fetchMedicationData();
  }, []);

  return (
    <div>
      <h1>Test Medication Statement API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {medications ? (
        <div>
          {medications.map((medication, index) => (
            <div key={index}>
              <p><strong>Medication:</strong> {medication.Medication}</p>
              <p><strong>ID:</strong> {medication.id}</p>
              <p><strong>Code:</strong> {medication.Code}</p>
              <p><strong>Last Updated:</strong> {medication.lastUpdated}</p>
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

export default MedicationStatementTestingApi;
