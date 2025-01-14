import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Patient from "../components/Patient"; // Import the Patient component
import Summary from "../components/PatientData/Summary"; // Import the Summary component (as per your comment)
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
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BiotechIcon from "@mui/icons-material/Biotech";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // State to manage the currently visible component, default to "Summary"
  const [activeComponent, setActiveComponent] = useState<string>("Summary");

  // Navigate functions
  const handleNavigateToHospitals = () => {
    navigate("/nearby-hospitals");
  };

  const handleNavigateToPharmas = () => {
    navigate("/nearby-pharmas");
  };

  const handleNavigateToVaccinationCentres = () => {
    navigate("/nearby-vaccination-centres");
  };

  const handleNavigateToLabs = () => {
    navigate("/nearby-labs");
  };

  // Render selected component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Summary":
        return <Summary />; // Render Summary component
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

  // Randomly generate some dates to mark with different colors
  const randomDates = [
    dayjs().add(2, "day"), // Date 2 days from now
    dayjs().add(5, "day"), // Date 5 days from now
    dayjs().add(8, "day"), // Date 8 days from now
  ];

  const isRandomDate = (date: any) => {
    return randomDates.some((randomDate) => randomDate.isSame(date, "day"));
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

          <div>
            <Typography variant="h6" className="mb-4 pl-4 text-red-600">
              Appointments
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{
                  width: "100%", // Make calendar fit the sidebar
                  // Styling the selected day
                  "& .MuiDayCalendar-daySelected": {
                    backgroundColor: "#f8d7da", // Light red background for selected date
                    color: "red", // Red text color for selected date
                  },
                  // Styling the random marked days
                  "& .MuiDayCalendar-day": {
                    backgroundColor: (date) =>
                      isRandomDate(date)
                        ? "#e2a4b7" // Random color for specific dates (light pink)
                        : "transparent",
                    color: (date) => (isRandomDate(date) ? "#fff" : "inherit"), // White text for random dates
                  },
                  // Hover effect on day text
                  "& .MuiTypography-root:hover": {
                    color: "#f8d7da", // Light red text on hover
                  },
                  // General hover effect on calendar
                  "&:hover": {
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Hover effect
                    cursor: "pointer",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Main Content (Right Side) */}
        <div className="w-4/5 py-8 px-12 flex flex-col items-center">
          {/* Buttons to render components */}
          <div className="mb-8 flex flex-wrap justify-start gap-4">
            {/* Search Nearby Hospitals Button */}
            <button
              onClick={handleNavigateToHospitals}
              className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out bg-white text-gray-500 hover:bg-red-600 hover:text-white"
            >
              <LocalHospitalIcon className="text-base" />
              <span>Search Nearby Hospitals</span>
            </button>

            {/* Search Nearby Pharmas Button */}
            <button
              onClick={handleNavigateToPharmas}
              className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out bg-white text-gray-500 hover:bg-red-600 hover:text-white"
            >
              <MedicationIcon className="text-base" />
              <span>Search Nearby Pharmas</span>
            </button>

            {/* Search Nearby Vaccination Centres Button */}
            <button
              onClick={handleNavigateToVaccinationCentres}
              className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out bg-white text-gray-500 hover:bg-red-600 hover:text-white"
            >
              <VaccinesIcon className="text-base" />
              <span>Search Nearby Vaccination Centres</span>
            </button>

            {/* Search Nearby Labs Button */}
            <button
              onClick={handleNavigateToLabs}
              className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out bg-white text-gray-500 hover:bg-red-600 hover:text-white"
            >
              <BiotechIcon className="text-base" />
              <span>Search Nearby Labs</span>
            </button>
          </div>

          <div className="flex mb-8 space-x-4 bg-slate-10 py-2 rounded-md shadow-md">
            {/* Add the new Summary button before Allergy */}
            <button
              onClick={() => setActiveComponent("Summary")}
              className={`py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300
                ${
                  activeComponent === "Summary"
                    ? "bg-red-100 text-red-600 shadow-md border border-red-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Summary
            </button>

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
