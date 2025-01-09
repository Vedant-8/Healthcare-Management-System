import React, { useEffect, useState } from "react";
import { Button, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import { getNearbyHospitals } from "../api/nearbyHospitalsApi";

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
  const navigate = useNavigate();  // Declare navigate function

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        console.debug(`[HospitalLocater] Fetching nearby hospitals`);
        const hospitalData = await getNearbyHospitals(latitude, longitude, radius);
        console.debug(`[HospitalLocater] Received hospital data:`, hospitalData);
        setHospitals(hospitalData);
      } catch (err) {
        console.error(`[HospitalLocater] Error occurred:`, err);
        setError("Failed to fetch nearby hospitals");
      }
    };

    fetchNearbyHospitals();
  }, [latitude, longitude, radius]);

  // Function to handle directions button click and navigate to the directions page
  const handleDirectionsClick = (hospital: HospitalData) => {
    navigate("/directions", {
      state: {
        originLat: latitude,
        originLon: longitude,
        destLat: hospital.latitude,
        destLon: hospital.longitude,
      },
    });
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
              className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
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

              {/* Directions Button */}
              <Button
                variant="contained"
                color="error"  // Red button
                onClick={() => handleDirectionsClick(hospital)}  // Call the navigation function
                className="mt-auto w-full"
              >
                Directions
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HospitalLocater;
