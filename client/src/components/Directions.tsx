import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access route state
import { getDirections } from "../api/directionsApi";

interface DirectionsProps {
  originLat: number;
  originLon: number;
  destLat: number;
  destLon: number;
}

const Directions: React.FC = () => {
  const location = useLocation();
  const { originLat, originLon, destLat, destLon }: DirectionsProps =
    location.state || {}; // Extract the state from the location

  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirections = async () => {
      const mapboxToken =
        "pk.eyJ1Ijoid2ViLWNvZGVncmFtbWVyIiwiYSI6ImNraHB2dXJvajFldTAzMm14Y2lveTB3a3cifQ.LfZtv0p9GUZCP7ZVuT33ow"; // Replace with actual token if needed

      try {
        const result = await getDirections(
          originLat,
          originLon,
          destLat,
          destLon,
          mapboxToken
        );

        // Debugging: Print the entire result object
        console.log("[Directions] API Response:", result);

        // Check if the htmlContent property exists in the response
        if (result && result.htmlContent) {
          console.log("[Directions] htmlContent:", result.htmlContent);
          setHtmlContent(result.htmlContent); // Set the raw HTML response
        } else {
          console.error(
            "[Directions] htmlContent is missing from the API response"
          );
        }
      } catch (err) {
        console.error("[Directions] Error occurred:", err);
      }
    };

    if (originLat && originLon && destLat && destLon) {
      fetchDirections();
    }
  }, [originLat, originLon, destLat, destLon]);

  return htmlContent ? (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }} // Directly render the HTML content
    />
  ) : null; // Return nothing if HTML content is not yet available
};

export default Directions;
