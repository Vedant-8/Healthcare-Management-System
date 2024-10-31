import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";

const HealthRecords = ({ userId }) => {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const res = await apiService.getHealthRecords(userId);
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, [userId]);

  return (
    <div>
      <h2>Health Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.timestamp}>{JSON.stringify(record.healthData)}</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthRecords;
