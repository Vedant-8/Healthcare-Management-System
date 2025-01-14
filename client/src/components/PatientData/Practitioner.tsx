import React, { useEffect, useState } from "react";
import { getPractitionerData } from "../../api/practitionerApi";
import practitionerFallbackData from "../../../../server/services/webhook/temp_jsons/Practitioner.json";
import PersonIcon from '@mui/icons-material/Person';

interface PractitionerData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
}

const Practitioner: React.FC = () => {
  const [practitioners, setPractitioners] = useState<PractitionerData[] | null>(null);

  useEffect(() => {
    const fetchPractitionerData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Practitioner";

      try {
        const response = await getPractitionerData(patientId, webhookType);
        if (response && response.length > 0) {
          setPractitioners(response.slice(0, 10)); // Take only the first 10 entries
        } else {
          setPractitioners(practitionerFallbackData.slice(0, 10)); // Use fallback data
        }
      } catch {
        setPractitioners(practitionerFallbackData.slice(0, 10)); // Use fallback data
      }
    };

    fetchPractitionerData();
  }, []);

  return (
    <div className="p-4">
      {practitioners ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practitioners.map((practitioner, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 relative"
            >
              <PersonIcon style={{ fontSize: 50 }} className="mb-2" />
              <p className="font-bold mb-2 text-red-600">{practitioner.Name}</p>
              <br />
              {/* ID is hidden by default, shown on hover */}
              <p className="absolute bottom-4 text-sm text-gray-500 opacity-0 transition-all duration-300 hover:opacity-100">
                ID: {practitioner.ID}
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

export default Practitioner;
