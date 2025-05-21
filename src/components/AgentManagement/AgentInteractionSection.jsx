import React from "react";
import { MessageSquare } from "lucide-react";

const AgentInteractionSection = () => {
  return (
    <div className="w-full mx-auto px-4 py-6 space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Agent Interactions</h2>
        <p className="text-sm text-gray-500">View and analyze agent-user communication history</p>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-md px-6 py-4 flex items-center justify-between">
        {/* Left Side - Icon and Text */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-md">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">Interaction History</div>
            <div className="text-sm text-gray-500">Real-time agent communications</div>
          </div>
        </div>

        {/* Right Side - Dropdown */}
        <select className="text-sm border rounded-md px-2 py-1 font-medium text-gray-800">
          <option>All Interactions</option>
          <option>Agent Only</option>
          <option>User Only</option>
        </select>
      </div>
    </div>
  );
};

export default AgentInteractionSection;
