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
      <main className="flex flex-1 bg-white">
        {/* Sidebar */}
        <div className="w-1/5 py-8 px-4 shadow-lg">
          <Patient />
        </div>

        {/* Main Content (Right Side) */}
        <div className="w-4/5 py-8 px-12 flex flex-col items-center">
          {/* Buttons to render components */}
          <div className="mb-8 flex flex-wrap justify-start gap-4">
            {/* Search Nearby Hospitals Button */}

            <button
              onClick={handleNavigateToHospitals}
              className="py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out bg-white text-gray-500 hover:bg-red-600 hover:text-white"
            >
              Search Nearby Hospitals
            </button>

            <div className="flex mb-8 space-x-4 bg-slate-10 py-2 rounded-md shadow-md">
              {[
                "Allergy",
                "Condition",
                "Insurance",
                "Immunization",
                "Medications",
                "Practitioner",
                "Procedures",
                "Relatives",
                "Observations",
              ].map((component) => (
                <button
                  key={component}
                  onClick={() => setActiveComponent(component)}
                  className={`py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300
                  ${
                    activeComponent === component
                      ? "bg-red-100 text-red-600 shadow-md border border-red-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {component}
                </button>
              ))}
            </div>
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
