import React, { useEffect, useState } from "react";
import { getRelatedPersonData } from "../../api/relatedPersonApi";
import relatedPersonFallbackData from "../../../../server/services/webhook/temp_jsons/related_person.json";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPersonData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "RelatedPerson";

      try {
        console.debug(`[Relatives] Fetching related person data for patient ${patientId}`);
        const response = await getRelatedPersonData(patientId, webhookType);
        if (response && response.length > 0) {
          console.debug(`[Relatives] Received related person data:`, response);
          setRelatedPersons(response);
        } else {
          throw new Error("Empty response from API");
        }
      } catch (err) {
        console.error(`[Relatives] Error occurred, using fallback data:`, err);
        setRelatedPersons(relatedPersonFallbackData);
        setError("Failed to fetch related person data. Using fallback data.");
      }
    };

    fetchRelatedPersonData();
  }, []);

  return (
    <div>
      <h1>Relatives Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {relatedPersons ? (
        <div>
          {relatedPersons.map((person, index) => (
            <div key={index} className="my-4 p-4 border rounded shadow-sm">
              <h3 className="font-bold text-red-600">{person.Name}</h3>
              <p>
                <strong>Relationship:</strong> {person.Relationship}
              </p>
              <p>
                <strong>Address:</strong> {person.Address || "Not available"}
              </p>
              <div>
                <strong>Telecom:</strong>
                <ul>
                  {person.Telecom.map((telecom, idx) => (
                    <li key={idx}>
                      {telecom.Use}: {telecom.Value} ({telecom.System})
                    </li>
                  ))}
                </ul>
              </div>
              <p><strong>Last Updated:</strong> {new Date(person["Last Updated"]).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Relatives;
