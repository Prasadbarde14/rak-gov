import React from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { useGetProjectData } from "../../../API/Query/query";
import { usePostGetProjectPlanning } from "../../../API/Mutation/mutation";
import { transform } from "framer-motion";
import { motion } from "framer-motion";

// Key Result Card
const KeyResult = ({ title, current, target, percentage, color }) => (
  <motion.div
    className="space-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
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
          <motion.div
            className={`absolute top-0 left-0 h-full ${color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <div className="text-sm text-gray-700 font-light">{percentage}</div>
      </div>
    </div>
  </motion.div>
);

// Main Overview Component
const ProjectPlanningOverview = ({selected,index,parentData}) => {

  const data=usePostGetProjectPlanning("Give me Project Data",selected,index,parentData,true)

  console.log(data)

  console.log(data.isLoading)
  

  return (
    <div className="w-full mx-auto bg-white rounded-md shadow-sm border mt-5">
      <div className="flex justify-between items-center border-b px-4 py-5">
        <h2 className="text-sm font-semibold text-gray-800">
          Project Planning Overview
        </h2>
        <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
          <PlusCircle className="w-4 h-4" /> New Objective
        </button>
      </div>

      {(data.isLoading || data.isFetching)&& (
        <div className="p-5 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) }
      {
        !data.isError && !data.isLoading && !data.isFetching && (
          <div className="p-5">
            <div className="space-y-2 border rounded-md">
              <div className="flex justify-between items-start flex-wrap gap-2 border-b p-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-900">{data.data.objectiveTitle}</h3>
                  <p className="text-sm text-gray-500">{data.data.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                    {data.data.quarter}
                  </span>
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <div className="text-sm text-gray-700 font-semibold">Key Results</div>
                  <div className="text-right text-xs text-gray-500 font-medium mt-1">
                    {data.data.completionPercent}% Complete
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-5">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${data.data.completionPercent}%` }}></div>
                </div>
                <div className="space-y-4 mt-3">
                  {data?.data?.keyResults?.map((kr, index) => (
                    <KeyResult key={index} {...kr} />
                  ))}
                </div>
                <button className="mt-4 flex items-center text-sm text-blue-600 hover:underline">
                  <PlusCircle className="w-4 h-4 mr-1" /> Add Key Result
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProjectPlanningOverview;
