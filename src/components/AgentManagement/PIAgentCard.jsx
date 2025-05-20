import React, { useState } from "react";
import { Copy } from "lucide-react";

const bqDescription = [
  {
    title: "Automated License Renewal & Cost Optimization",
    description:
      "This query evaluates renewal decisions based on actual usage data by analyzing license utilization, renewal costs, and vendor contracts. It helps automate cost negotiations by referencing Vendor contract terms and penalty clauses while ensuring compliance using data from LicenseManagement. The insights support better cost-saving strategies and alternative pricing considerations.",
    uuid: "67e685913abba16dc18768ef",
    rawQuery: `SELECT 
  L.id AS license_id,
  L.type AS license_type,
  L.cost AS license_cost,
  FROM t_67e685913abba16dc18768ef_t;`,
  },
  {
    title: "Automated License Renewal & Cost Optimization",
    description:
      "This query evaluates renewal decisions based on actual usage data by analyzing license utilization, renewal costs, and vendor contracts. It helps automate cost negotiations by referencing Vendor contract terms and penalty clauses while ensuring compliance using data from LicenseManagement. The insights support better cost-saving strategies and alternative pricing considerations.",
    uuid: "67e685913abba16dc18768ef",
    rawQuery: `SELECT 
  L.id AS license_id,
  L.type AS license_type,
  L.cost AS license_cost,
  LM.totalLicenses,
  LM.activeLicenses,
  LM.unusedLicenses,
  LM.duplicateLicenses,
  LM.licenseRenewalCost,
  LM.complianceStatus AS license_mgmt_complianceStatus`,
  },
];

const canonicalParams = [
  "supportCoverageHours",
  "severity",
  "totalLicenses",
  "activeLicenses",
  "unusedLicenses",
  "duplicateLicenses",
  "licenseRenewalCost",
  "complianceStatus",
  "vendorDiversityIndex",
  "teamName",
  "regionalComplianceVariance",
  "realTimeTrackingEnabled",
  "totalTickets",
  "resolvedTickets",
  "averageResolutionTime",
];

const PIAgentCard = () => {
  const [copiedQuery, setCopiedQuery] = useState(null);

  async function setClipboard(text, id) {
    try {
      const blob = new Blob([text], { type: "text/plain" });
      const clipboardItem = new ClipboardItem({ "text/plain": blob });
      await navigator.clipboard.write([clipboardItem]);
      setCopiedQuery(id);
      setTimeout(() => setCopiedQuery(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">PI Agent</h2>
        <p className="text-slate-600">Monitor real-time Flow</p>
      </div>

      <div className="bg-white rounded flex flex-col md:flex-row gap-2 w-full">
        <div className="flex-1 rounded bg-white ">
          {/* Analytical Parameters */}
          <div className="h-full">
            <div className="text-md  font-semibold py-2 px-4 ">
              Analytical Parameters
            </div>
            <div className="max-h-[500px] overflow-y-auto scrollbar-custom">
              <ul className="p-4 space-y-2 text-sm">
                {canonicalParams.map((param) => (
                  <li
                    key={param}
                    className="bg-gray-100 px-3 py-2 rounded border text-gray-800"
                  >
                    {param}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded bg-white">
          {/* Analytics Queries */}
          <div className="h-full flex flex-col">
            <div className="text-md font-semibold py-2 px-4 ">
              Analytics Queries
            </div>
            <div className="max-h-[500px] overflow-y-auto scrollbar-custom p-2 space-y-4">
              {bqDescription?.map((bq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg shadow-sm p-4 bg-gray-50 hover:shadow-md transition duration-300"
                >
                  {/* Title */}
                  <h3 className="text-blue-800 font-bold text-md mb-1">
                    {bq.title}
                  </h3>

                  {/* Description */}
                  <div className="mb-2">
                    <div className="text-gray-500 text-xs font-semibold mb-1">
                      Description
                    </div>
                    <div className="font-light text-sm text-gray-600">
                      {bq.description}
                    </div>
                  </div>

                  {/* UUID / URI */}
                  <div className="mb-3">
                    <div className="text-gray-500 text-xs font-semibold mb-1">
                      Query ID
                    </div>
                    <div className="text-gray-700 text-sm font-semibold  bg-gray-50 p-2 rounded-md border border-gray-200 break-all">
                      {bq.uuid}
                    </div>
                  </div>

                  {/* SQL Query with copy */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 text-xs font-semibold">
                        SQL Query
                      </span>
                      <button
                        onClick={() => setClipboard(bq.rawQuery, index)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Copy query to clipboard"
                      >
                        {copiedQuery === index ? (
                          <span className="text-green-600">Copied!</span>
                        ) : (
                          <div className="cursor-pointer flex gap-1">
                            <Copy className="h-4 w-4  opacity-80 hover:opacity-100 transition" />
                            Copy
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="bg-background-dark text-gray-100 text-xs font-mono rounded-md overflow-auto max-h-60 border border-gray-700 shadow-inner relative scrollbar-custom">
                      <div className="flex">
                        {/* Line numbers */}
                        <div className="bg-[#1e293b] text-gray-400 py-2 px-3 text-right select-none">
                          {bq.rawQuery.split("\n").map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>

                        {/* SQL Code */}
                        <pre className="p-2 whitespace-pre wrap flex-1 overflow-auto">
                          <code>{bq.rawQuery}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Use Case Footer (Optional) */}
                  {bq.usecaseName && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Use case: </span>
                      <span className="text-xs font-medium text-gray-700">
                        {bq.usecaseName}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIAgentCard;
