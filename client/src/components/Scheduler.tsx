import * as React from "react";
import { useState } from "react";
import { Grid, Button, Typography, TextField, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ffebee", // Very light red
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#ffcdd2",
    transform: "scale(1.05)",
    transition: "all 0.2s ease-in-out",
  },
}));

const SelectedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ef5350", // Dark red
  borderRadius: "8px",
}));

const Scheduler: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = () => {
    // Handle API call here with selectedSlot and reason
    setOpen(true);
  };

  const availableSlots = ["10:00:00", "13:00:00", "16:00:00", "19:00:00"];

  return (
    <div>
      <Grid container spacing={2} mt={2}>
        {availableSlots.map((slot) => (
          <Grid item xs={6} key={slot}>
            <Button
              variant="contained"
              onClick={() => handleSlotSelect(slot)}
              sx={{
                ...(selectedSlot === slot && {
                  backgroundColor: "#ef5350", // Dark red
                }),
              }}
            >
              {slot}
            </Button>
          </Grid>
        ))}
      </Grid>

      <TextField
        id="outlined-basic"
        label="Reason"
        variant="outlined"
        fullWidth
        margin="normal"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        autoComplete="off" // Disable autocomplete
      />

      {selectedSlot && reason && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            backgroundColor: "#f75f54", // Red background color
            color: "white", // White text color
            "&:hover": {
              backgroundColor: "#d14e44", // Darker red on hover
            },
          }}
        >
          Submit
        </Button>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your appointment is booked!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Scheduler;
