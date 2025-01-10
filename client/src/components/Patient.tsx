import React, { useEffect, useState } from "react";
import { getPatient } from "../api/patientApi";
import tempPatientData from "../../../server/services/webhook/temp_jsons/patiend_get.json"; // Adjust the relative path if needed.
import { Button, Typography } from "@mui/material";
import { Edit, LocationOn } from "@mui/icons-material";

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
        const {
          firstName,
          lastName,
          dob,
          genderAtBirth,
          dateCreated,
          address,
        } = response.patientData;
        setPatient({
          firstName,
          lastName,
          dob,
          genderAtBirth,
          dateCreated,
          address,
        });
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
        setPatient({
          firstName,
          lastName,
          dob,
          genderAtBirth,
          dateCreated,
          address,
        });
      }
    };

    fetchPatient();
  }, []);

  return (
    <div className="p-6">
      {patient ? (
        <div className="space-y-6">
          {/* Display patient's name in red */}
          <Typography variant="h4" className="text-red-600 font-semibold mb-6">
            {patient.firstName} {patient.lastName}
          </Typography>

          {/* Patient Details with <br /> tag between each */}
          <div>
            <p className="text-gray-500">
              <strong>DOB:</strong> {patient.dob}
              <br />
              <strong>Gender:</strong> {patient.genderAtBirth}
              <br />
              <strong>Date Created:</strong>{" "}
              {new Date(patient.dateCreated).toLocaleDateString()}
            </p>
          </div>

          {/* Address Section */}
          {patient.address.length > 0 && (
            <div>
              <Typography variant="h6" className="font-semibold text-gray-800">
                Address:
              </Typography>
              {patient.address.map((addr, index) => (
                <div key={index} className="mt-2 flex items-start space-x-2">
                  <LocationOn className="text-red-600" />
                  <div>
                    <p className="text-gray-600">{addr.addressLine1}</p>
                    <p className="text-gray-600">
                      {addr.city}, {addr.state}, {addr.zip}
                    </p>
                    <p className="text-gray-600">{addr.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outlined"
              color="error" // Set the default color to error (red)
              startIcon={<Edit />}
              className="px-6 py-2 rounded-lg border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
            >
              Edit Details
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Patient;
