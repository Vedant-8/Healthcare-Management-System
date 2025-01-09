import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Slider, Typography, Card } from "@mui/material";
import HospitalLocater from "../components/HospitalLocater"; // Import the HospitalLocater component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Maps: React.FC = () => {
  // State to hold the radius selected by the user
  const [radius, setRadius] = useState<number>(5000);

  // Using the `useGeolocated` hook to get the user's latitude and longitude
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // Handling the change in slider value
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  // Check if geolocation is available and enabled
  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation.</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled.</div>;
  }

  // If coordinates are available, we can render the hospital locator
  if (coords) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex flex-1 bg-[#ffebee]">
          {/* Sidebar - Left Side for Options */}
          <div className="w-1/4 bg-[#ffebee] py-8 px-4 shadow-lg">
            <div className="flex flex-col items-start mb-8">
              <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                Hospital Locator
              </Typography>

              {/* Slider for radius */}
              <Typography variant="h6" className="mb-4 text-gray-700">
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
                className="w-full"
              />
            </div>
          </div>

          {/* Main Content - Right Side for Responses */}
          <div className="w-3/4 py-8 px-12 flex flex-col items-center space-y-6">
            <Typography variant="h5" className="font-bold mb-6 text-gray-800">
              Locate Nearby Hospitals
            </Typography>

            {/* Updated HospitalLocater Component */}
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

  // If coordinates are still not available, display loading
  return <div>Getting location...</div>;
};

export default Maps;
