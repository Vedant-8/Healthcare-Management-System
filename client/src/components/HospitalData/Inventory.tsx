import React, { useEffect, useState } from "react";
import hospitalInventoryFallbackData from "../../../../server/services/webhook/temp_jsons/hospital_inverory.json";
import { Card, CardContent} from "@mui/material";

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
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);

  useEffect(() => {
    // Directly using fallback data as shown in the other components
    setInventoryData(hospitalInventoryFallbackData as InventoryData);
  }, []);

  return (
    <div className="p-6">
      {inventoryData ? (
        <Card sx={{ maxWidth: "100%", boxShadow: 3 }}>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Item ID</th>
                    <th className="px-4 py-2 text-left border-b">Item Name</th>
                    <th className="px-4 py-2 text-left border-b">Quantity & Unit</th>
                    <th className="px-4 py-2 text-left border-b">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.inventory.map((item) => (
                    <tr key={item.item_id}>
                      <td className="px-4 py-2 border-b">{item.item_id}</td>
                      <td className="px-4 py-2 border-b">{item.item_name}</td>
                      <td className="px-4 py-2 border-b">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(item.expiry_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Inventory;
