import React from "react";
import HospitalLocator from "../components/HospitalLocator";
import HealthRecords from "../components/HealthRecords";
import AppointmentScheduler from "../components/AppointmentScheduler";

const Dashboard = ({ userId }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <HospitalLocator />
      <HealthRecords userId={userId} />
      <AppointmentScheduler />
    </div>
  );
};

export default Dashboard;
