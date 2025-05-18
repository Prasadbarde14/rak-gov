import React from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";

const KeyResult = ({ title, current, target, percentage, color }) => {
  return (
    <div className="space-y-1">
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
          <input type="radio" className="mt-1" />
          <div className="text-sm  font-semibold text-gray-800">{title}</div>
        </div>
        <div className="w-full flex gap-2.5">
          <div className="text-xs text-gray-500">
            {current} of {target}
          </div>
          <div className="relative w-full h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${color} rounded-full`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-sm text-gray-700 font-light">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

const ProjectPlanningOverview = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-md shadow-sm border mt-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b px-4 py-5">
        <h2 className="text-sm font-semibold text-gray-800">
          
          Project Planning Overview
        </h2>
        <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
          <PlusCircle className="w-4 h-4" /> New Objective
        </button>
      </div>

      {/* Objective Block */}
      <div className="p-5">
        <div className="space-y-2 border rounded-md">
          <div className="flex justify-between items-start flex-wrap gap-2 border-b p-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-900">
                Reduce average project delay by 25% in Q3
              </h3>
              <p className="text-sm text-gray-500">
                Focus on improving project timelines through better monitoring
                and management
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                Q3 2025
              </span>
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div className="p-4">
            {/* Progress Summary */}
            <div className="flex">
              <div className="text-sm text-gray-700 font-semibold">
                Key Results
              </div>
              <div className="text-right text-xs text-gray-500 font-medium mt-1">
                65% Complete
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full">
              <div className="h-full bg-yellow-400 rounded-full w-[65%]"></div>
            </div>

            {/* Key Results */}
            <div className="space-y-4 mt-3">
              <KeyResult
                title="Achieve ≥ 90% on-time milestone completions"
                current="78%"
                target="90%"
                percentage={87}
                color="bg-green-500"
              />
              <KeyResult
                title="Cut contractor response time from 12h to 6h"
                current="8.5 hours"
                target="6 hours"
                percentage={58}
                color="bg-yellow-400"
              />
            </div>

            {/* Add Key Result */}
            <button className="mt-4 flex items-center text-sm text-blue-600 hover:underline">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Key Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlanningOverview;
