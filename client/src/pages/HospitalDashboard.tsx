import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Appointments from "../components/HospitalData/Appointments";
import Patients from "../components/HospitalData/Patients";
import Inventory from "../components/HospitalData/Inventory";
import Practitioner from "../components/PatientData/Practitioner";

const HospitalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Appointments");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Appointments":
        return <Appointments />;
      case "Patients":
        return <Patients />;
      case "Inventory":
        return <Inventory />;
      case "Practitioner":
        return <Practitioner />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard */}
      <main className="flex flex-col items-center flex-1 bg-gray-100 py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Welcome to the Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex mb-8 space-x-4 bg-gray-50 px-4 py-2 rounded-md shadow-md">
          {["Appointments", "Patients", "Inventory", "Practitioner"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-sm font-medium rounded-lg transition-all
                  ${
                    activeTab === tab
                      ? "bg-red-100 text-red-600 shadow-md border border-red-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Render Active Component */}
        <div className="w-full max-w-4xl">{renderActiveComponent()}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HospitalDashboard;
