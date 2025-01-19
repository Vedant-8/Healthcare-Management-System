import React, { useEffect, useState } from "react";
import hospitalPatientsFallbackData from "../../../../server/services/webhook/temp_jsons/hospitals_patient.json";
import { Card, CardContent, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

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

  useEffect(() => {
    // Directly using the fallback data as shown in the Practitioner file
    setPatients(hospitalPatientsFallbackData as PatientData);
  }, []);

  return (
    <div className="p-6">
      <Card sx={{ maxWidth: "100%", marginBottom: "20px", boxShadow: 3 }}>
        <CardContent>
          {patients ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patients.patient_data.map((patient) => (
                <div
                  key={patient.id}
                  className="flex flex-col items-center p-4 border rounded shadow-sm bg-white hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 relative"
                >
                  <PersonIcon style={{ fontSize: 50 }} className="mb-2" />
                  <p className="font-bold mb-2 text-red-600">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">Etag: {patient.eTag}</p>
                  <p className="mb-2 text-sm text-gray-600">
                    Date of Birth: {new Date(patient.dob).toLocaleDateString()}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    Gender at Birth: {patient.genderAtBirth}
                  </p>
                  <br />
                  {/* ID is hidden by default, shown on hover */}
                  <p className="absolute bottom-4 text-sm text-gray-500 opacity-0 transition-all duration-300 hover:opacity-100">
                    Patient ID: {patient.id}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
