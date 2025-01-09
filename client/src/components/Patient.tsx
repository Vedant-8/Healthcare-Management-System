import React, { useEffect, useState } from "react";
import { getPatient } from "../api/patientApi";
import tempPatientData from "../../../server/services/webhook/temp_jsons/patiend_get.json"; // Adjust the relative path if needed.

interface Address {
  zip: string;
  city: string;
  state: string;
  country: string;
  addressLine1: string;
}

interface PatientData {
  firstName: string;
  lastName: string;
  dob: string;
  genderAtBirth: string;
  dateCreated: string;
  address: Address[];
}

const Patient: React.FC = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      try {
        console.debug(`[Patient] Fetching patient with ID: ${patientId}`);
        const response = await getPatient(patientId);
        console.debug(`[Patient] Received patient data:`, response.patientData);
        const { firstName, lastName, dob, genderAtBirth, dateCreated, address } =
          response.patientData;
        setPatient({ firstName, lastName, dob, genderAtBirth, dateCreated, address });
      } catch (err) {
        console.error(`[Patient] API request failed:`, err);
        console.warn(
          `[Patient] Falling back to local data from patient_get.json.`
        );
        const {
          firstName,
          lastName,
          dob,
          genderAtBirth,
          dateCreated,
          address,
        } = tempPatientData.patientData;
        setPatient({ firstName, lastName, dob, genderAtBirth, dateCreated, address });
      }
    };

    fetchPatient();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Patient Data</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {patient ? (
        <div className="p-4 border rounded shadow-md bg-white">
          <p>
            <strong>Name:</strong> {patient.firstName} {patient.lastName}
          </p>
          <p>
            <strong>DOB:</strong> {patient.dob}
          </p>
          <p>
            <strong>Gender:</strong> {patient.genderAtBirth}
          </p>
          <p>
            <strong>Date Created:</strong> {new Date(patient.dateCreated).toLocaleDateString()}
          </p>
          {patient.address.length > 0 && (
            <div className="mt-4">
              <strong>Address:</strong>
              {patient.address.map((addr, index) => (
                <div key={index} className="mt-2">
                  <p>{addr.addressLine1}</p>
                  <p>
                    {addr.city}, {addr.state}, {addr.zip}
                  </p>
                  <p>{addr.country}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Patient;
