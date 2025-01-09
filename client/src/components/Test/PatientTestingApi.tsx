import React, { useEffect, useState } from "react";
import { getPatient } from "../../api/patientApi";

interface PatientData {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  genderAtBirth: string;
}

const PatientTestingApi: React.FC = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      try {
        console.debug(
          `[PatientTestingApi] Fetching patient with ID: ${patientId}`
        );
        const response = await getPatient(patientId);
        console.debug(
          `[PatientTestingApi] Received patient data:`,
          response.patientData
        );
        setPatient(response.patientData);
      } catch (err) {
        console.error(`[PatientTestingApi] Error occurred:`, err);
        setError("Failed to fetch patient data");
      }
    };

    fetchPatient();
  }, []);

  return (
    <div>
      <h1>Test Patient API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {patient ? (
        <div>
          <p>
            <strong>ID:</strong> {patient.id}
          </p>
          <p>
            <strong>Name:</strong> {patient.firstName} {patient.lastName}
          </p>
          <p>
            <strong>DOB:</strong> {patient.dob}
          </p>
          <p>
            <strong>Gender:</strong> {patient.genderAtBirth}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientTestingApi;
