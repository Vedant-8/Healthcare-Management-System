import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createPatient } from "../api/fhirApi";

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    givenName: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createPatient(formData);
    if (response) {
      alert("Patient created successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <Typography variant="h4" className="text-gray-800 font-bold mb-6">
        Create a Patient
      </Typography>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <TextField
          label="Family Name"
          name="familyName"
          fullWidth
          required
          value={formData.familyName}
          onChange={handleChange}
        />
        <TextField
          label="Given Name"
          name="givenName"
          fullWidth
          required
          value={formData.givenName}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name="gender"
          fullWidth
          required
          value={formData.gender}
          onChange={handleChange}
        />
        <TextField
          label="Birth Date"
          name="birthDate"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.birthDate}
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

export default PatientForm;
