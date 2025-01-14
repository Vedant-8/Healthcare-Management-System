import React, { useEffect, useState } from "react";
import labObservationsFallbackData from "../../../../server/services/webhook/temp_jsons/observation_lab.json";
import vitalObservationsFallbackData from "../../../../server/services/webhook/temp_jsons/observation_vitals.json";
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

const Observations: React.FC = () => {
  const [labObservations, setLabObservations] = useState<ObservationData[] | null>(null);
  const [vitalObservations, setVitalObservations] = useState<ObservationData[] | null>(null);

  useEffect(() => {
    const fetchObservationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Observation";

      try {
        const { labObservations, vitalObservations } = await getObservationData(patientId, webhookType);
        // Limit the data to 20 rows
        setLabObservations(labObservations.slice(0, 20));
        setVitalObservations(vitalObservations.slice(0, 20));
      } catch {
        // No error handling, using JSON data directly as per request
        setLabObservations(labObservationsFallbackData.slice(0, 20));
        setVitalObservations(vitalObservationsFallbackData.slice(0, 20));
      }
    };

    fetchObservationData();
  }, []);

  // Function to determine the background color based on the value and reference range
  const getValueBackgroundColor = (value: number, referenceRange: string) => {
    if (referenceRange === "N/A") return "";
    const [min, max] = referenceRange.split(" - ").map(parseFloat);
    if (value < min) return "bg-yellow-200"; // Light yellow if value is lower than range
    if (value > max) return "bg-red-200"; // Light red if value is higher than range
    return "bg-green-200"; // Green if value is within the range
  };

  return (
    <div className="p-6">
      {/* Laboratory Observations Table with Color Legend */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-red-600 text-2xl">Laboratory Observations</h2>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 mr-2"></div>
            <span>In Range</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-200 mr-2"></div>
            <span>Below Range</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 mr-2"></div>
            <span>Above Range</span>
          </div>
        </div>
      </div>
      
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Observation Code</th>
            <th className="border-b px-4 py-2">Value</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Issued Date</th>
            <th className="border-b px-4 py-2">Effective Date</th>
          </tr>
        </thead>
        <tbody>
          {labObservations?.map((observation, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">{observation["Observation Code"]}</td>
              <td
                className={`border-b px-4 py-2 ${getValueBackgroundColor(observation.Value, observation["Reference Range"])}`}
              >
                {observation.Value} {observation.Unit}
              </td>
              <td className="border-b px-4 py-2">{observation.Status}</td>
              <td className="border-b px-4 py-2">{new Date(observation["Issued Date"]).toLocaleString()}</td>
              <td className="border-b px-4 py-2">{new Date(observation["Effective Date"]).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vital Signs Observations Table */}
      <h2 className="text-red-600 text-2xl mt-8 mb-4">Vital Signs Observations</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Observation Code</th>
            <th className="border-b px-4 py-2">Value</th>
            <th className="border-b px-4 py-2">Issued Date</th>
            <th className="border-b px-4 py-2">Effective Date</th>
          </tr>
        </thead>
        <tbody>
          {vitalObservations?.map((observation, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">{observation["Observation Code"]}</td>
              <td
                className={`border-b px-4 py-2 ${getValueBackgroundColor(observation.Value, observation["Reference Range"])}`}
              >
                {observation.Value} {observation.Unit}
              </td>
              <td className="border-b px-4 py-2">{new Date(observation["Issued Date"]).toLocaleString()}</td>
              <td className="border-b px-4 py-2">{new Date(observation["Effective Date"]).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Observations;
