import React, { useEffect, useState } from "react";
import { getCoverageData } from "../../api/converageApi";

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

const CoverageTestingApi: React.FC = () => {
  const [coverage, setCoverage] = useState<
    CoverageData[] | OrganizationData[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverageData = async () => {
      const patientId = "01943bc1-fd38-7c9c-9947-14f7458a7428";
      const webhookType = "Coverage";
      try {
        console.debug(
          `[CoverageTestingApi] Fetching coverage data for patient ${patientId}`
        );
        const response = await getCoverageData(patientId, webhookType);
        console.debug(`[CoverageTestingApi] Received coverage data:`, response);
        setCoverage(response);
      } catch (err) {
        console.error(`[CoverageTestingApi] Error occurred:`, err);
        setError("Failed to fetch coverage data");
      }
    };

    fetchCoverageData();
  }, []);

  return (
    <div>
      <h1>Test Coverage Data API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {coverage ? (
        <div>
          {Array.isArray(coverage) && coverage.length > 0 && (
            <>
              <h2>Coverage Data</h2>
              {coverage
                .filter((item) => (item as CoverageData).coverageId) // Filter out organization data
                .map((coverageItem, index) => (
                  <div key={index}>
                    <p>
                      <strong>Coverage ID:</strong>{" "}
                      {(coverageItem as CoverageData).coverageId}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {(coverageItem as CoverageData).status}
                    </p>
                    <p>
                      <strong>Payor:</strong>{" "}
                      {(coverageItem as CoverageData).payor}
                    </p>
                    <p>
                      <strong>Identifier:</strong>{" "}
                      {(coverageItem as CoverageData).identifier}
                    </p>
                    <p>
                      <strong>Relationship:</strong>{" "}
                      {(coverageItem as CoverageData).relationship}
                    </p>
                    <p>
                      <strong>Last Updated:</strong>{" "}
                      {(coverageItem as CoverageData).lastUpdated}
                    </p>
                  </div>
                ))}
              <h2>Organization Data</h2>
              {coverage
                .filter((item) => (item as OrganizationData).organizationId) // Filter out coverage data
                .map((orgItem, index) => (
                  <div key={index}>
                    <p>
                      <strong>Organization Name:</strong>{" "}
                      {(orgItem as OrganizationData).name}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {(orgItem as OrganizationData).address}
                    </p>
                  </div>
                ))}
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoverageTestingApi;
