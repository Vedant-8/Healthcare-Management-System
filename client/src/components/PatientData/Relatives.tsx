import React, { useEffect, useState } from "react";
import { getRelatedPersonData } from "../../api/relatedPersonApi";
import relatedPersonFallbackData from "../../../../server/services/webhook/temp_jsons/related_person.json";
import Person3Icon from '@mui/icons-material/Person3';
import PersonIcon from '@mui/icons-material/Person';

interface Telecom {
  Use: string;
  Value: string;
  System: string;
}

interface RelatedPersonData {
  "Full URL": string;
  ID: string;
  "Last Updated": string;
  Name: string;
  Address: string;
  Telecom: Telecom[];
  Relationship: string;
}

const Relatives: React.FC = () => {
  const [relatedPersons, setRelatedPersons] = useState<RelatedPersonData[] | null>(null);

  useEffect(() => {
    const fetchRelatedPersonData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "RelatedPerson";

      try {
        const response = await getRelatedPersonData(patientId, webhookType);
        if (response && response.length > 0) {
          setRelatedPersons(response);
        } else {
          setRelatedPersons(relatedPersonFallbackData);
        }
      } catch {
        setRelatedPersons(relatedPersonFallbackData);
      }
    };

    fetchRelatedPersonData();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 justify-center p-2">
      {relatedPersons ? (
        relatedPersons.map((person, index) => {
          const isMother = person.Relationship.toLowerCase() === "mother";
          const isFather = person.Relationship.toLowerCase() === "father";

          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 border rounded-lg shadow-xl w-full sm:w-1/2 lg:w-1/3 bg-white hover:shadow-2xl transition-all"
            >
              {/* Conditionally render the correct icon */}
              {isMother ? (
                <Person3Icon style={{ fontSize: 80, color: "#4caf50" }} />
              ) : isFather ? (
                <PersonIcon style={{ fontSize: 80, color: "#2196f3" }} />
              ) : (
                <PersonIcon style={{ fontSize: 80, color: "#000" }} />
              )}
              <p className="font-bold text-xl mt-4">{person.Name}</p>
              <p className="text-sm text-gray-500">{person.Relationship}</p>
              <p className="text-sm mt-2">{person.Address || "Address not available"}</p>
              <div className="mt-4 w-full">
                <strong className="text-sm">Telecom:</strong>
                <ul className="list-disc pl-4">
                  {person.Telecom.map((telecom, idx) => (
                    <li key={idx} className="text-sm">
                      {telecom.Use}: {telecom.Value} ({telecom.System})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center w-full">Loading...</p>
      )}
    </div>
  );
};

export default Relatives;
