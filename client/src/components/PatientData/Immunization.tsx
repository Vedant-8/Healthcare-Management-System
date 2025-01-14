import React, { useEffect, useState } from "react";
import { getImmunizationData } from "../../api/immunizationApi";
import immunizationFallbackData from "../../../../server/services/webhook/temp_jsons/Immunization.json";

interface VaccineCode {
  text: string;
  code: string;
  display: string;
  system: string;
}

interface ImmunizationData {
  id: string;
  status: string;
  lastUpdated: string;
  vaccineCode: VaccineCode;
  occurrenceDateTime: string;
}

const Immunization: React.FC = () => {
  const [immunizations, setImmunizations] = useState<ImmunizationData[] | null>(
    null
  );

  useEffect(() => {
    const fetchImmunizationData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Immunization";

      try {
        const response = await getImmunizationData(patientId, webhookType);
        if (response && response.length > 0) {
          setImmunizations(response);
        } else {
          setImmunizations(immunizationFallbackData); // Fallback data
        }
      } catch {
        setImmunizations(immunizationFallbackData); // Fallback data
      }
    };

    fetchImmunizationData();
  }, []);

  return (
    <div className="p-4">
      {immunizations ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {immunizations.map((immunization, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg shadow-md text-center flex flex-col justify-between h-full transition-all duration-300 ease-in-out transform ${
                immunization.status === "completed"
                  ? "bg-green-100" // Light green background for completed
                  : "bg-white"
              } hover:scale-105 hover:shadow-lg`}
            >
              <h3 className="font-bold text-lg text-green-800 mb-4">
                {immunization.vaccineCode.text}
              </h3>
              <div className="mt-auto">
                <p className="text-gray-700 mb-2">
                  <strong>Vaccine Code:</strong> {immunization.vaccineCode.code}
                </p>
                <p className="text-gray-700">
                  <strong>Occurrence Date:</strong>{" "}
                  {new Date(immunization.occurrenceDateTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Immunization;
