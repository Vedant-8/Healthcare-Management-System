import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Slider, Typography, Card } from "@mui/material";
import HospitalLocater from "../components/HospitalLocater"; // Import the HospitalLocater component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Maps: React.FC = () => {
  const [radius, setRadius] = useState<number>(5000);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation.</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled.</div>;
  }

  if (coords) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex flex-col items-center p-4">
          {/* Centered Slider Card */}
          <Card
            elevation={2}
            className="mb-8 p-4 shadow-lg"
            sx={{
              backgroundColor: "#f9fafb",
              width: "300px",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            <Typography variant="h6" className="font-bold text-gray-800 mb-4">
              Hospital Locator
            </Typography>

            {/* Slider for radius */}
            <Typography variant="body1" className="mb-4 text-gray-700">
              Select Radius: {radius} meters
            </Typography>
            <Slider
              value={radius}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}m`}
              min={2000}
              max={7000}
              step={500}
            />
          </Card>

          {/* Hospital Locator */}
          <div className="flex-1 w-full px-12 flex flex-col items-center">
            <HospitalLocater
              latitude={coords.latitude}
              longitude={coords.longitude}
              radius={radius}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return <div>Getting location...</div>;
};

export default Maps;
