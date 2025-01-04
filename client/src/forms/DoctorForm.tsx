import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createDoctor } from "../api/fhirApi";

const DoctorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    givenName: "",
    gender: "",
    qualification: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createDoctor(formData);
    if (response) {
      alert("Doctor created successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <Typography variant="h4" className="text-gray-800 font-bold mb-6">
        Create a Doctor
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
          label="Qualification"
          name="qualification"
          fullWidth
          required
          value={formData.qualification}
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

export default DoctorForm;
