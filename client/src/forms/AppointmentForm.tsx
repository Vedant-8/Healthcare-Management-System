import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Card } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import axios from "axios";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    reason: "",
    selectedSlot: "",
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch available slots
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const url =
        "http://0.0.0.0:8050/api/facility/get_available_slots?hospital_id=0194370c-bdfc-7b80-84d7-d75fcfc566db";
      try {
        const response = await axios.post(url);
        setAvailableSlots(response.data.available_slots);
      } catch (error) {
        console.error("Failed to fetch available slots:", error);
        setAvailableSlots([]);
      }
    };
    fetchAvailableSlots();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle slot selection
  const handleSlotSelection = (slot: string) => {
    setFormData((prev) => ({ ...prev, selectedSlot: slot }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://0.0.0.0:8050/api/create_appointment`;
    try {
      const response = await axios.post(url, null, {
        params: { ...formData },
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
      className="flex justify-center items-center min-h-screen bg-red-100 p-4"
    >
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Appointment"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="mb-4"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-2 text-center">
                Select an Available Slot
              </Typography>
              <Grid container spacing={2}>
                {availableSlots.map((slot) => (
                  <Grid item xs={6} key={slot}>
                    <Button
                      variant={formData.selectedSlot === slot ? "contained" : "outlined"}
                      startIcon={<AccessTime />}
                      fullWidth
                      onClick={() => handleSlotSelection(slot)}
                      className="hover:scale-105 transition-transform"
                    >
                      {slot}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!formData.selectedSlot || !formData.reason}
                className="mt-4"
              >
                Submit
              </Button>
            </Grid>
            {responseMessage && (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  align="center"
                  className={
                    responseMessage.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
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
