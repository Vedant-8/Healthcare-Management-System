import axios from "axios";

interface DirectionsResponse {
  htmlContent: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8050";

export const getDirections = async (
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  mapboxToken: string
): Promise<DirectionsResponse> => {
  try {
    console.debug(
      `[getDirections] Fetching route data from origin: (${originLat}, ${originLon}) to destination: (${destLat}, ${destLon})`
    );
    const response = await axios.get<string>(`${API_BASE_URL}/api/directions`, {
      params: {
        origin_lat: originLat,
        origin_lon: originLon,
        dest_lat: destLat,
        dest_lon: destLon,
        mapbox_token: mapboxToken,
      },
    });

    console.debug("[getDirections] Route data fetched successfully.");
    return { htmlContent: response.data };
  } catch (error: any) {
    console.error("[getDirections] Error fetching route data:", error.response || error.message);
    throw error;
  }
};
