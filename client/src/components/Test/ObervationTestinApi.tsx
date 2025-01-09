import React, { useEffect, useState } from "react";
import { getObservationData } from "../../api/obervationApi";

interface ObservationData {
  "Observation Code": string;
  Category: string;
  Status: string;
  Value: number;
  Unit: string;
  "Reference Range": string;
  "Issued Date": string;
  "Effective Date": string;
}

const ObservationTestingApi: React.FC = () => {
  const [labObservations, setLabObservations] = useState<
    ObservationData[] | null
  >(null);
  const [vitalObservations, setVitalObservations] = useState<
    ObservationData[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObservationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Observation";
      try {
        console.debug(
          `[ObservationTestingApi] Fetching observation data for patient ${patientId}`
        );
        const { labObservations, vitalObservations } = await getObservationData(
          patientId,
          webhookType
        );
        console.debug(`[ObservationTestingApi] Received observation data:`, {
          labObservations,
          vitalObservations,
        });
        setLabObservations(labObservations);
        setVitalObservations(vitalObservations);
      } catch (err) {
        console.error(`[ObservationTestingApi] Error occurred:`, err);
        setError("Failed to fetch observation data");
      }
    };

    fetchObservationData();
  }, []);

  return (
    <div>
      <h1>Test Observation API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Laboratory Observations</h2>
      {labObservations ? (
        <div>
          {labObservations.map((observation, index) => (
            <div key={index}>
              <p>
                <strong>Observation Code:</strong>{" "}
                {observation["Observation Code"]}
              </p>
              <p>
                <strong>Value:</strong> {observation.Value} {observation.Unit}
              </p>
              <p>
                <strong>Reference Range:</strong>{" "}
                {observation["Reference Range"]}
              </p>
              <p>
                <strong>Status:</strong> {observation.Status}
              </p>
              <p>
                <strong>Issued Date:</strong>{" "}
                {new Date(observation["Issued Date"]).toLocaleString()}
              </p>
              <p>
                <strong>Effective Date:</strong>{" "}
                {new Date(observation["Effective Date"]).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h2>Vital Signs Observations</h2>
      {vitalObservations ? (
        <div>
          {vitalObservations.map((observation, index) => (
            <div key={index}>
              <p>
                <strong>Observation Code:</strong>{" "}
                {observation["Observation Code"]}
              </p>
              <p>
                <strong>Value:</strong> {observation.Value} {observation.Unit}
              </p>
              <p>
                <strong>Reference Range:</strong>{" "}
                {observation["Reference Range"]}
              </p>
              <p>
                <strong>Status:</strong> {observation.Status}
              </p>
              <p>
                <strong>Issued Date:</strong>{" "}
                {new Date(observation["Issued Date"]).toLocaleString()}
              </p>
              <p>
                <strong>Effective Date:</strong>{" "}
                {new Date(observation["Effective Date"]).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ObservationTestingApi;
