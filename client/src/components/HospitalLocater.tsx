import React, { useEffect, useState } from "react";
import { Button, Typography, Card, Drawer, Box } from "@mui/material";
import { getNearbyHospitals } from "../api/nearbyHospitalsApi";
import AppointmentForm from "../forms/AppointmentForm"; // Import the AppointmentForm component

interface HospitalData {
  fsq_id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string | null;
  locality: string | null;
  region: string | null;
  postcode: string | null;
  country: string;
  formatted_address: string;
  "phone number": string;
  email: string;
  categories: string;
  link: string;
}

interface HospitalLocaterProps {
  latitude: number;
  longitude: number;
  radius: number;
}

const HospitalLocater: React.FC<HospitalLocaterProps> = ({ latitude, longitude, radius }) => {
  const [hospitals, setHospitals] = useState<HospitalData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the Drawer
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(null); // Store selected hospital details

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        const hospitalData = await getNearbyHospitals(latitude, longitude, radius);
        setHospitals(hospitalData);
      } catch (err) {
        setError("Failed to fetch nearby hospitals");
      }
    };

    fetchNearbyHospitals();
  }, [latitude, longitude, radius]);

  // Open Drawer with selected hospital details
  const handleScheduleClick = (hospital: HospitalData) => {
    setSelectedHospital(hospital);
    setDrawerOpen(true);
  };

  // Close the Drawer
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedHospital(null);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {hospitals ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {hospitals.map((hospital, index) => (
            <Card
              key={index}
              elevation={6}
              className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg flex flex-col"
            >
              {/* Hospital Name centered */}
              <Typography variant="h6" className="font-bold mb-4 text-center text-gray-800">
                {hospital.name}
              </Typography>

              <div className="flex-grow">
                <Typography variant="body2" className="mb-2 text-gray-600">
                  <strong>Distance:</strong> {hospital.distance} meters
                </Typography>

                <Typography variant="body2" className="mb-2 text-gray-600">
                  <strong>Address:</strong> {hospital.formatted_address || "Not available"}
                </Typography>

                <Typography variant="body2" className="mb-2 text-gray-600">
                  <strong>Phone:</strong> {hospital["phone number"]}
                </Typography>

                <Typography variant="body2" className="mb-2 text-gray-600">
                  <strong>Email:</strong> {hospital.email}
                </Typography>

                <Typography variant="body2" className="mb-2 text-gray-600">
                  <strong>Category:</strong> {hospital.categories}
                </Typography>
              </div>

              {/* Buttons */}
              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => console.log('Navigate to directions')}
                  className="flex-grow"
                >
                  Directions
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleScheduleClick(hospital)}
                  className="flex-grow"
                >
                  Schedule Appointment
                </Button>
              </Box>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* MUI Drawer for Appointment Form */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box width={400} p={3}>
          {selectedHospital && (
            <>
              <Typography variant="h6" className="mb-4 text-gray-800">
                Schedule Appointment for {selectedHospital.name}
              </Typography>
              <AppointmentForm />
            </>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default HospitalLocater;
