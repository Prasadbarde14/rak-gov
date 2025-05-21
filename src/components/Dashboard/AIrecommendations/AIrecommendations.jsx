import React, { useEffect, useState } from "react";
import {
  Target,
  CheckCircle,
  Zap,
  TrendingUp,
  Plus,
  CircleAlert,
} from "lucide-react";
import {
  useGetAIrecommendationsData,
  useGetFetchQuery,
  useGetFetchQueryState,
} from "../../../API/Query/query";
import SkeletonRecommendationCard from "./SkeletonRecommendationCard";
import { usePostAIRecommendation, usePostGetSimmulationResult } from "../../../API/Mutation/mutation";
import { useQueryClient } from "@tanstack/react-query";

// Card style definitions
const cardStyles = {
  objective: {
    border: "border-blue-500",
    icon: <Target className="w-4 h-4 text-blue-500" />,
  },
  "key Result": {
    border: "border-green-500",
    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
  },
  action: {
    border: "border-yellow-500",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
  },
};

// Main Recommendation Card
const RecommendationCard = ({data }) => {


  const {type, title, description, confidence }=data
  const style = cardStyles[type];
  return (
    <div
      className={`border-l-4 ${style.border} bg-white shadow-sm p-4 rounded-md space-y-2 w-full`}
    >
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span className="flex items-center font-medium gap-2 text-slate-500 uppercase">
          {style.icon}
          Suggested {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span className="text-gray-400 font-normal">
          {confidence}% confidence
        </span>
      </div>
      <div className="text-gray-900 font-medium">{title}</div>
      <div className="bg-gray-50 text-xs text-gray-700 p-2 rounded-md flex gap-2">
        <span>
          <CircleAlert size={20} color="#bebbbb" strokeWidth={1} />
        </span>
        {description}
      </div>
      <button
        className={`w-full mt-1 text-sm font-semilight rounded-md py-1 hover:bg-opacity-10 flex text-slate-600 items-center justify-center gap-2 bg-slate-100`}
      >
        <Plus size={18} /> Add to plan
      </button>
    </div>
  );
};

// Main Wrapper Component
function AIrecommendations({ selected }) {

  const data = useGetFetchQueryState(['graphAnalysis', selected]);
  const mutatePerformaceData = usePostAIRecommendation("give me AIRecommendations ", selected,!!data)


  return (
    <>
      <div className="border-b p-4 flex items-center gap-2 font-semibold text-gray-800">
        <TrendingUp color="#F59E0B" size={20} />
        AI Recommendations
      </div>

      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        {mutatePerformaceData.isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRecommendationCard key={i} />
          ))}

        {!mutatePerformaceData.isLoading &&
          !mutatePerformaceData.isError &&
          mutatePerformaceData?.data?.map((rec, index) => <RecommendationCard key={index} data={rec}/>)}
      </div>
    </>
  );
}

export default AIrecommendations;
