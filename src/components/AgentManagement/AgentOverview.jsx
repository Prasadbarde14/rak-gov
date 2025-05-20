
import React from "react";
import {
  CheckCircle,
  Timer,
  AlertTriangle,
  Bot,
  CircleDot,
} from "lucide-react";

// Agent Card
const AgentCard = ({
  name,
  description,
  successRate,
  executionTime,
  errorRate,
  capabilityKey,
  capabilityDesc,
  status = "idle",
}) => {
  return (
    <div className="border rounded-lg bg-white px-6 py-5 space-y-5 shadow-sm w-full">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base font-semibold text-gray-800">
              {name}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full capitalize">
          {status}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-3">
        <div className="bg-gray-50 rounded-md border px-4 py-3 w-full md:w-52">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <CheckCircle className="w-4 h-4" />
            Success Rate
          </div>
          <div className="text-lg font-semibold text-black">{successRate}%</div>
        </div>

        <div className="bg-gray-50 rounded-md border px-4 py-3 w-full md:w-52">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <Timer className="w-4 h-4" />
            Execution Time
          </div>
          <div className="text-lg font-semibold text-black">{executionTime}</div>
        </div>

        <div className="bg-gray-50 rounded-md border px-4 py-3 w-full md:w-52">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <AlertTriangle className="w-4 h-4" />
            Error Rate
          </div>
          <div className="text-lg font-semibold text-black">{errorRate}%</div>
        </div>
      </div>

      <hr />

      {/* Active Capabilities */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">
          Active Capabilities
        </p>
        <div className="flex items-start gap-2 text-sm">
          <CircleDot className="text-green-500 w-4 h-4 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800">{capabilityKey}</span>
            <p className="text-gray-500 text-xs">{capabilityDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page Section
const AgentOverview = () => {
  const agents = [
    {
      name: "Marco Agent",
      description: "Analyzes performance data and suggests strategic objectives",
      successRate: 0.0,
      executionTime: "0ms",
      errorRate: 0.0,
      capabilityKey: "objective-generation",
      capabilityDesc: "Generates strategic objectives based on KPI trends and gaps",
    },
    {
      name: "BOB Agent",
      description: " Transferring data through the Open API to the PI artifacts.",
      successRate: 0.0,
      executionTime: "0ms",
      errorRate: 0.0,
      capabilityKey: "anomaly-detection",
      capabilityDesc: "Transferring data through the Open API to the PI artifacts.",
    },  {
        name: "PI Agent",
        description: "Analyzes performance data and create PI artifacts",
        successRate: 0.0,
        executionTime: "0ms",
        errorRate: 0.0,
        capabilityKey: "objective-generation",
        capabilityDesc: "Generates all possible schemas, BQ, adhoc, etc. (PI artifacts)",
      }
  ];

  return (
    <div className="w-full  mx-auto px-4 py-6 space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Active Agents</h2>
        <p className="text-sm text-gray-500">
          Monitor and manage AI agents orchestrating your performance management system
        </p>
      </div>

      {/* Agent Cards */}
      {agents.map((agent, idx) => (
        <AgentCard key={idx} {...agent} />
      ))}
    </div>
  );
};

export default AgentOverview;
