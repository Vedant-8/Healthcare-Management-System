import React, { useState } from "react";
import apiService from "../services/apiService";

const AppointmentScheduler = () => {
  const [userId, setUserId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const scheduleAppointment = async () => {
    await apiService.scheduleAppointment({ userId, doctorId, appointmentDate });
    alert("Appointment scheduled successfully");
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <input
        type="datetime-local"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />
      <button onClick={scheduleAppointment}>Schedule</button>
    </div>
  );
};

export default AppointmentScheduler;
