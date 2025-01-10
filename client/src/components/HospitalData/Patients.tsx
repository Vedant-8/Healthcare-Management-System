import React, { useEffect, useState } from "react";
import hospitalPatientsFallbackData from "../../../../server/services/webhook/temp_jsons/hospitals_patient.json";

interface Address {
  zip: string;
  city: string;
  state: string;
  country: string;
  addressLine1: string;
}

interface Patient {
  id: string;
  eTag: string;
  facilityIds: string[];
  externalId: string | null;
  dateCreated: string;
  firstName: string;
  lastName: string;
  dob: string;
  genderAtBirth: string;
  address: Address[];
}

interface PatientData {
  hospital_id: string;
  hospital_name: string;
  patient_data: Patient[];
  last_updated: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientsData = async () => {
      const hospitalId = "12345"; // Example hospital ID
      const apiUrl = `/api/hospital/${hospitalId}/patients`; // Example API endpoint for fetching patients

      try {
        console.debug(
          `[Patients] Fetching patient data for hospital ${hospitalId}`
        );
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data: PatientData = await response.json();
          console.debug(`[Patients] Received patient data:`, data);
          setPatients(data);
        } else {
          throw new Error(`API returned status ${response.status}`);
        }
      } catch (err) {
        console.error(`[Patients] Error occurred, using fallback data:`, err);
        setPatients(hospitalPatientsFallbackData as PatientData);
        setError("Failed to fetch patient data. Using fallback data.");
      }
    };

    fetchPatientsData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Patients</h1>
      {error && <p className="text-red-600">{error}</p>}
      {patients ? (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {patients.hospital_name}
          </h2>
          <p className="mb-4 text-gray-600">
            <strong>Last Updated:</strong>{" "}
            {new Date(patients.last_updated).toLocaleString()}
          </p>
          <div className="space-y-4">
            {patients.patient_data.map((patient) => (
              <div
                key={patient.id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <h3 className="font-bold text-gray-700">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(patient.dob).toLocaleDateString()}
                </p>
                <p>
                  <strong>Gender at Birth:</strong> {patient.genderAtBirth}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {patient.address.map((addr, idx) => (
                    <span key={idx}>
                      {addr.addressLine1}, {addr.city}, {addr.state}, {addr.zip}
                      , {addr.country}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Date Created:</strong>{" "}
                  {new Date(patient.dateCreated).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Patients;
