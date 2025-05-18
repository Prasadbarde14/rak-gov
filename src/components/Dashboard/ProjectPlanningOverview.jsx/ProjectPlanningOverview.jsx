import React from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";

// JSON Data Source
const projectData = {
  objectiveTitle: "Reduce average project delay by 25% in Q3",
  description: "Focus on improving project timelines through better monitoring and management",
  quarter: "Q3 2025",
  completionPercent: 65,
  keyResults: [
    {
      title: "Achieve ≥ 90% on-time milestone completions",
      current: "78%",
      target: "90%",
      percentage: 87,
      color: "bg-green-500",
    },
    {
      title: "Cut contractor response time from 12h to 6h",
      current: "8.5 hours",
      target: "6 hours",
      percentage: 58,
      color: "bg-yellow-400",
    },
  ],
};

// Key Result Card
const KeyResult = ({ title, current, target, percentage, color }) => (
  <div className="space-y-1">
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <input type="radio" className="mt-1" />
        <div className="text-sm font-semibold text-gray-800">{title}</div>
      </div>
      <div className="w-full flex gap-2.5">
        <div className="text-xs text-gray-500 w-[10%]">
          {current} of {target}
        </div>
        <div className="relative w-[85%] h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
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

// Main Overview Component
const ProjectPlanningOverview = () => {
  const {
    objectiveTitle,
    description,
    quarter,
    completionPercent,
    keyResults,
  } = projectData;

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
              <h3 className="text-base font-semibold text-gray-900">{objectiveTitle}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                {quarter}
              </span>
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <div className="p-4">
            {/* Progress Summary */}
            <div className="flex justify-between mb-3">
              <div className="text-sm text-gray-700 font-semibold">Key Results</div>
              <div className="text-right text-xs text-gray-500 font-medium mt-1">
                {completionPercent}% Complete
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full mb-5">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>

            {/* Key Results (Dynamic) */}
            <div className="space-y-4 mt-3">
              {keyResults.map((kr, index) => (
                <KeyResult key={index} {...kr} />
              ))}
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
