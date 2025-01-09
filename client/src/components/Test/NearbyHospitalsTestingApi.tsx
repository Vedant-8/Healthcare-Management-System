import React, { useEffect, useState } from "react";
import { getNearbyHospitals } from "../../api/nearbyHospitalsApi";

interface HospitalData {
  fsq_id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string | null;
  locality: string | null;
  region: string | null;
  postcode: string | null;
  country: string;
  formatted_address: string;
  "phone number": string;
  email: string;
  categories: string;
  link: string;
}

const NearbyHospitalsTestingApi: React.FC = () => {
  const [hospitals, setHospitals] = useState<HospitalData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      const latitude = 19.0388022; // Example latitude
      const longitude = 73.0840487; // Example longitude
      const radius = 5000; // Example radius (5000 meters)

      try {
        console.debug(`[NearbyHospitalsTestingApi] Fetching nearby hospitals`);
        const hospitalData = await getNearbyHospitals(latitude, longitude, radius);
        console.debug(`[NearbyHospitalsTestingApi] Received hospital data:`, hospitalData);
        setHospitals(hospitalData);
      } catch (err) {
        console.error(`[NearbyHospitalsTestingApi] Error occurred:`, err);
        setError("Failed to fetch nearby hospitals");
      }
    };

    fetchNearbyHospitals();
  }, []);

  return (
    <div>
      <h1>Nearby Hospitals</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {hospitals ? (
        <div>
          {hospitals.map((hospital, index) => (
            <div key={index}>
              <h3>{hospital.name}</h3>
              <p><strong>Distance:</strong> {hospital.distance} meters</p>
              <p><strong>Address:</strong> {hospital.formatted_address || "Not available"}</p>
              <p><strong>Phone:</strong> {hospital["phone number"]}</p>
              <p><strong>Email:</strong> {hospital.email}</p>
              <p><strong>Category:</strong> {hospital.categories}</p>
              <a href={`http://localhost:8050${hospital.link}`} target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NearbyHospitalsTestingApi;
