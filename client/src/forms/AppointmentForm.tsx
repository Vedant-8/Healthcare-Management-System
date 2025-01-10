import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card } from "@mui/material";
import axios from "axios";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    hospital_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    insurance_provider: "",
    insurance_id: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://0.0.0.0:8050/api/create_appointment`;
    try {
      const response = await axios.post(url, null, {
        params: formData,
      });
      setResponseMessage("Appointment created successfully!");
      console.log(response.data);
    } catch (error) {
      setResponseMessage("Failed to create appointment. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#ffebee"
      p={2}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 4,
          boxShadow: 6,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient ID"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hospital ID"
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Appointment Date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="time"
                label="Appointment Time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Appointment"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Insurance Provider"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Insurance ID"
                name="insurance_id"
                value={formData.insurance_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
            {responseMessage && (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  align="center"
                  color={
                    responseMessage.includes("successfully")
                      ? "green"
                      : "error"
                  }
                >
                  {responseMessage}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default AppointmentForm;
