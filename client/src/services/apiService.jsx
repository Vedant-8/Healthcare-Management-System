import axios from "axios";

const api = axios.create({
  baseURL: "YOUR_BACKEND_API_ENDPOINT", 
});

const getNearbyHospitals = (location) => {
  return api.get(`/hospitals?location=${location}`);
};

const getHealthRecords = (userId) => {
  return api.get(`/healthRecords/${userId}`);
};

const scheduleAppointment = (data) => {
  return api.post(`/appointments`, data);
};

const apiService = {
  getNearbyHospitals,
  getHealthRecords,
  scheduleAppointment,
};

export default apiService;
