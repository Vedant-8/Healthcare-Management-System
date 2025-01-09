import React, { useEffect, useState } from "react";
import { getDirections } from "../../api/directionsApi";

const DirectionsPage: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirections = async () => {
      const originLat = 19.03450;
      const originLon = 73.068625;
      const destLat = 19.0388;
      const destLon = 73.084;
      const mapboxToken = "pk.eyJ1Ijoid2ViLWNvZGVncmFtbWVyIiwiYSI6ImNraHB2dXJvajFldTAzMm14Y2lveTB3a3cifQ.LfZtv0p9GUZCP7ZVuT33ow";

      try {
        console.debug("[DirectionsPage] Fetching route directions...");
        const result = await getDirections(originLat, originLon, destLat, destLon, mapboxToken);
        setHtmlContent(result.htmlContent);
      } catch (err) {
        console.error("[DirectionsPage] Error occurred:", err);
        setError("Failed to fetch directions");
      }
    };

    fetchDirections();
  }, []);

  return (
    <div>
      <h1>Directions</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {htmlContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ width: "100%", height: "90vh" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DirectionsPage;
