import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Patient from "../components/Patient"; // Import the Patient component
import Allergy from "../components/PatientData/Allergy"; // Import the Allergy component
import Condition from "../components/PatientData/Condition"; // Import the Condition component
import Insurance from "../components/PatientData/Insurance"; // Import the Insurance component
import Immunization from "../components/PatientData/Immunization"; // Import the Immunization component
import Medications from "../components/PatientData/Medications"; // Import the Medications component
import Practitioner from "../components/PatientData/Practitioner"; // Import the Practitioner component
import Procedures from "../components/PatientData/Procedures"; // Import the Procedures component
import Relatives from "../components/PatientData/Relatives"; // Import the Relatives component
import Observations from "../components/PatientData/Observations"; // Import the Observations component
import { Typography, Button, Card } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // State to manage the currently visible component
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Navigate to Nearby Hospitals
  const handleNavigateToHospitals = () => {
    navigate("/nearby-hospitals");
  };

  // Render selected component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Allergy":
        return <Allergy />;
      case "Condition":
        return <Condition />;
      case "Insurance":
        return <Insurance />;
      case "Immunization":
        return <Immunization />;
      case "Medications":
        return <Medications />;
      case "Practitioner":
        return <Practitioner />;
      case "Procedures":
        return <Procedures />;
      case "Relatives":
        return <Relatives />;
      case "Observations":
        return <Observations />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#ffebee] py-8 px-4 shadow-lg">
          <div className="flex items-center mb-8">
            <Person className="text-red-600 mr-2" />
            <Typography variant="h6" className="font-bold text-gray-800">
              User Profile
            </Typography>
          </div>

          {/* Patient Component */}
          <div className="mt-4">
            <Patient />
          </div>

          {/* Nearby Hospitals Button */}
          <div className="mt-8">
            <Button
              variant="contained"
              color="error"
              onClick={handleNavigateToHospitals}
              className="w-full rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Search Nearby Hospitals
            </Button>
          </div>
        </div>

        {/* Main Content (Right Side) */}
        <div className="w-3/4 py-8 px-12 flex flex-col items-center bg-[#ffebee]">
          {/* Header */}

          {/* Buttons to render components */}
          <div className="mb-8 flex flex-wrap justify-start gap-4">
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Allergy")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Allergies
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Condition")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Conditions
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Insurance")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Insurance
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Immunization")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Immunization
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Medications")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Medications
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Practitioner")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Practitioners
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Procedures")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Procedures
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Relatives")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Relatives
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setActiveComponent("Observations")}
              className="w-1/4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Observations
            </Button>
          </div>

          {/* Render the active component */}
          {activeComponent && (
            <Card
              elevation={6}
              className="w-full p-6 bg-white rounded-lg shadow-md"
              style={{ borderRadius: "12px" }}
            >
              {renderActiveComponent()}
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
