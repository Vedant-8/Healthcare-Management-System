import React, { useState } from "react";
import apiService from "../services/apiService";

const HospitalLocator = () => {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const findHospitals = async () => {
    const res = await apiService.getNearbyHospitals(location);
    setHospitals(res.data);
  };

  return (
    <div>
      <h2>Find Nearby Hospitals</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location"
      />
      <button onClick={findHospitals}>Search</button>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>{hospital.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalLocator;
