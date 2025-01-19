import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Card,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Modal,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsIcon from "@mui/icons-material/Directions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom"; // For navigation
import { getNearbyHospitals } from "../api/nearbyHospitalsApi";
import Scheduler from "./Scheduler";

interface HospitalData {
  fsq_id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string | null;
  formatted_address: string;
  "phone number": string;
}

interface HospitalLocaterProps {
  latitude: number;
  longitude: number;
  radius: number;
}

const HospitalLocater: React.FC<HospitalLocaterProps> = ({
  latitude,
  longitude,
  radius,
}) => {
  const [hospitals, setHospitals] = useState<HospitalData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalData | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        const hospitalData = await getNearbyHospitals(
          latitude,
          longitude,
          radius
        );
        setHospitals(hospitalData);
      } catch (err) {
        setError("Failed to fetch nearby hospitals");
      }
    };

    fetchNearbyHospitals();
  }, [latitude, longitude, radius]);

  const handleScheduleClick = (hospital: HospitalData) => {
    setSelectedHospital(hospital);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedHospital(null);
  };

  const handleDirectionsClick = () => {
    navigate("/directions");
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {hospitals ? (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {hospitals.map((hospital, index) => (
            <Card
              key={index}
              elevation={6}
              className="w-full max-w-xs p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "280px",
              }}
            >
              {/* Hospital Name with Red Background */}
              <Box
                sx={{
                  backgroundColor: "#f75f54",
                  padding: "10px",
                  borderRadius: "5px 5px 0 0",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {hospital.name}
                </Typography>
              </Box>

              {/* Table for Details */}
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <LocationOnIcon
                        sx={{ color: "#FF5722", marginRight: 1 }}
                      />
                      Distance
                    </TableCell>
                    <TableCell>{hospital.distance} meters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <HomeIcon sx={{ color: "#3F51B5", marginRight: 1 }} />
                      Address
                    </TableCell>
                    <TableCell>
                      {hospital.formatted_address || "Not available"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <PhoneIcon sx={{ color: "#4CAF50", marginRight: 1 }} />
                      Phone
                    </TableCell>
                    <TableCell>
                      {hospital["phone number"] || "Not available"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Buttons */}
              <Box display="flex" gap={2} mt={3} justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1e6932",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  startIcon={<DirectionsIcon />}
                  onClick={handleDirectionsClick}
                  className="flex-grow"
                >
                  Directions
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => handleScheduleClick(hospital)}
                  className="flex-grow"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Schedule
                </Button>
              </Box>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for Appointment Form */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)", // Blur the background
        }}
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 24,
            padding: 3,
          }}
        >
          {selectedHospital && (
            <>
              <Typography variant="h6" className="mb-4 text-red-500 font-bold">
                Schedule Appointment for {selectedHospital.name}
              </Typography>
              <Scheduler />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default HospitalLocater;
