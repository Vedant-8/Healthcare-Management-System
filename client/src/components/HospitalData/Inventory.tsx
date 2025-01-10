import React, { useEffect, useState } from "react";
import hospitalInventoryFallbackData from "../../../../server/services/webhook/temp_jsons/hospital_inverory.json";

interface InventoryItem {
  item_id: string;
  item_name: string;
  quantity: number;
  unit: string;
  expiry_date: string;
}

interface InventoryData {
  hospital_id: string;
  hospital_name: string;
  inventory: InventoryItem[];
  last_updated: string;
}

const Inventory: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      const hospitalId = "0194370c-bdfc-7b80-84d7-d75fcfc566db"; // Example hospital ID
      const apiUrl = `/api/hospital/${hospitalId}/inventory`; // Example API endpoint for fetching inventory

      try {
        console.debug(
          `[Inventory] Fetching inventory data for hospital ${hospitalId}`
        );
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data: InventoryData = await response.json();
          console.debug(`[Inventory] Received inventory data:`, data);
          setInventoryData(data);
        } else {
          throw new Error(`API returned status ${response.status}`);
        }
      } catch (err) {
        console.error(`[Inventory] Error occurred, using fallback data:`, err);
        setInventoryData(hospitalInventoryFallbackData as InventoryData);
        setError("Failed to fetch inventory data. Using fallback data.");
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Inventory</h1>
      {error && <p className="text-red-600">{error}</p>}
      {inventoryData ? (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {inventoryData.hospital_name}
          </h2>
          <p className="mb-4 text-gray-600">
            <strong>Last Updated:</strong>{" "}
            {new Date(inventoryData.last_updated).toLocaleString()}
          </p>
          <div className="space-y-4">
            {inventoryData.inventory.map((item) => (
              <div
                key={item.item_id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <h3 className="font-bold text-gray-700">{item.item_name}</h3>
                <p>
                  <strong>Quantity:</strong> {item.quantity} {item.unit}
                </p>
                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {new Date(item.expiry_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Inventory;
