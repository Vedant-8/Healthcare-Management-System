import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createAppointment } from "../api/fhirApi";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    description: "",
    start: "",
    end: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createAppointment(
      formData.patientId,
      formData.doctorId,
      formData.description,
      formData.start,
      formData.end
    );
    if (response) {
      alert("Appointment created successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <Typography variant="h4" className="text-gray-800 font-bold mb-6">
        Create an Appointment
      </Typography>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <TextField
          label="Patient ID"
          name="patientId"
          fullWidth
          required
          value={formData.patientId}
          onChange={handleChange}
        />
        <TextField
          label="Doctor ID"
          name="doctorId"
          fullWidth
          required
          value={formData.doctorId}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          required
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Start Time"
          name="start"
          type="datetime-local"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.start}
          onChange={handleChange}
        />
        <TextField
          label="End Time"
          name="end"
          type="datetime-local"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.end}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
