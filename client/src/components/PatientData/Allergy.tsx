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

  // Helper function to calculate the difference between dates
  const calculatePeriodDuration = (period: string): string => {
    const periodDate = new Date(period);
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - periodDate.getTime();

    // Convert to months and years
    const differenceInMonths = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 30));
    const differenceInYears = Math.floor(differenceInMonths / 12);

    if (differenceInYears > 0) {
      return `${differenceInYears} year${differenceInYears > 1 ? "s" : ""} ago`;
    } else if (differenceInMonths > 0) {
      return `${differenceInMonths} month${differenceInMonths > 1 ? "s" : ""} ago`;
    } else {
      return "Less than a month ago";
    }
  };

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
      {allergies ? (
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Allergy</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Manifestation</th>
                <th className="px-4 py-2 text-left border-b">Period</th>
              </tr>
            </thead>
            <tbody>
              {allergies.map((allergy, index) => (
                <tr key={index}>
                  {/* Allergy */}
                  <td className="px-4 py-2 border-b">{allergy.Allergy}</td>

                  {/* Status */}
                  <td
                    className={`px-4 py-2 border-b ${
                      allergy.Status === "active" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {allergy.Status}
                  </td>

                  {/* Manifestation */}
                  <td className="px-4 py-2 border-b">
                    {allergy.Manifestation}
                  </td>

                  {/* Period */}
                  <td className="px-4 py-2 border-b">
                    {calculatePeriodDuration(allergy.Period)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Performer Information */}
          <div className="mt-8">
            <h3 className="font-bold text-red-600">Performer</h3>
            <p className="text-gray-700">David K Smith MD (Internal Medicine)</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Allergy;
