import React, { useEffect, useState } from "react";
import { getCoverageData } from "../../api/converageApi";
import insuranceFallbackData from "../../../../server/services/webhook/temp_jsons/insurance.json";
import { Person, Policy, CalendarToday, Badge } from "@mui/icons-material";

interface CoverageData {
  patientId: string;
  coverageId: string;
  status: string;
  payor: string;
  identifier: string;
  relationship: string;
  lastUpdated: string;
}

interface OrganizationData {
  organizationId: string;
  name: string;
  address: string;
}

const Insurance: React.FC = () => {
  const [coverage, setCoverage] = useState<CoverageData[] | null>(null);
  const [organization, setOrganization] = useState<OrganizationData | null>(
    null
  );

  useEffect(() => {
    const fetchCoverageData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Coverage";

      try {
        const response = await getCoverageData(patientId, webhookType);

        const org = (response as OrganizationData[]).find(
          (item) => (item as OrganizationData).organizationId
        ) as OrganizationData;

        const coverageData = (response as CoverageData[]).filter(
          (item) => (item as CoverageData).coverageId
        ) as CoverageData[];

        setOrganization(org || null);
        setCoverage(coverageData.length > 0 ? coverageData : null);
      } catch {
        const fallbackOrg = (insuranceFallbackData as OrganizationData[]).find(
          (item) => (item as OrganizationData).organizationId
        ) as OrganizationData;

        const fallbackCoverage = (insuranceFallbackData as CoverageData[]).filter(
          (item) => (item as CoverageData).coverageId
        ) as CoverageData[];

        setOrganization(fallbackOrg || null);
        setCoverage(fallbackCoverage.length > 0 ? fallbackCoverage : null);
      }
    };

    fetchCoverageData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Organization Details */}
      {organization && (
        <div className="p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            {organization.name}
          </h1>
          <p className="text-gray-600">
            <span className="font-semibold">Address: </span>
            {organization.address}
          </p>
        </div>
      )}

      {/* Coverage Details */}
      {coverage ? (
        <div className="space-y-4">
          {coverage.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >{/* Coverage Details */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border-spacing-0">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b border-gray-200">
                      Field
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b border-gray-200">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                      <Policy className="text-blue-600" />
                      <span>Coverage ID</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.coverageId}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                      <Person className="text-green-600" />
                      <span>Payor</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.payor}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                      <Badge className="text-yellow-600" />
                      <span>Identifier</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.identifier}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700 flex items-center space-x-2">
                      <Person className="text-purple-600" />
                      <span>Relationship</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{item.relationship}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            

              {/* Status and Last Updated */}
              <div className="mt-4 md:mt-0 md:ml-6">
                <div
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    item.status === "active"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {item.status}
                </div>
                <div className="flex items-center space-x-2 mt-2 text-gray-600">
                  <CalendarToday className="text-gray-500" />
                  <span className="text-sm">
                    Last Updated:{" "}
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Insurance;
