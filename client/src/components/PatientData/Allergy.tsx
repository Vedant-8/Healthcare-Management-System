import React, { useEffect, useState } from "react";
import { getAllergyData } from "../../api/allergyApi";
import allergyFallbackData from "../../../../server/services/webhook/temp_jsons/allergy.json";

interface Code {
  Text: string;
  System: string;
  Code: string;
}

interface Reference {
  Performer: string;
  Name: string;
  Qualification: string;
}

interface AllergyData {
  Allergy: string;
  Manifestation: string;
  Status: string;
  Criticality: string;
  Period: string;
  Codes: Code;
  References: Reference;
}

const Allergy: React.FC = () => {
  const [allergies, setAllergies] = useState<AllergyData[] | null>(null);

  useEffect(() => {
    const fetchAllergyData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "AllergyIntolerance";

      try {
        const response = await getAllergyData(patientId, webhookType);
        if (response && response.length > 0) {
          setAllergies(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        setAllergies(allergyFallbackData);
      }
    };

    fetchAllergyData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-red-600">Allergy Data</h1>
      <br />
      {allergies ? (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allergies.map((allergy, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
                  allergy.Status === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-200 text-red-800 hover:bg-red-300"
                }`}
                style={{ textAlign: "center" }}
              >
                {allergy.Allergy}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-red-600">Performer</h3>
            <p className="text-gray-700">{`David K Smith MD (Internal Medicine)`}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Allergy;
