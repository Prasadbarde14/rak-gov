import React from "react";
import { Target, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { useGetAIrecommendationsData } from "../../API/Query/query";

// Card style definitions
const cardStyles = {
  objective: {
    border: "border-blue-500",
    text: "text-blue-600",
    icon: <Target className="w-4 h-4 text-blue-500" />,
  },
  keyResult: {
    border: "border-green-500",
    text: "text-green-600",
    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
  },
  action: {
    border: "border-yellow-500",
    text: "text-yellow-600",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
  },
};

// Main Recommendation Card
const RecommendationCard = ({ type, title, description, confidence }) => {
  const style = cardStyles[type];
  return (
    <div className={`border-l-4 ${style.border} bg-white shadow-md p-4 rounded-md space-y-2 w-full`}>
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold uppercase">
        <span className="flex items-center gap-1">
          {style.icon}
          Suggested {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span className="text-gray-700 font-normal">{confidence}% confidence</span>
      </div>
      <div className="text-gray-900 font-semibold text-justify">{title}</div>
      <div className="bg-gray-100 text-sm text-gray-700 p-2 rounded-md text-justify">{description}</div>
      <button className={`w-full mt-1 text-sm ${style.text} font-medium border ${style.text} rounded-md py-1 hover:bg-opacity-10`}>
        + Add to plan
      </button>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonRecommendationCard = () => (
  <div className="border-l-4 border-gray-300 bg-white shadow-md p-4 rounded-md space-y-2 w-full animate-pulse">
    <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
      <span className="flex items-center gap-1">
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
        <div className="w-24 h-3 bg-gray-300 rounded" />
      </span>
      <div className="w-16 h-3 bg-gray-300 rounded" />
    </div>
    <div className="w-full h-4 bg-gray-300 rounded text-justify"></div>
    <div className="w-5/6 h-3 bg-gray-300 rounded text-justify"></div>
    <div className="bg-gray-100 p-2 rounded-md">
      <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
    </div>
    <div className="w-full h-8 bg-gray-300 rounded-md mt-1"></div>
  </div>
);

// Main Wrapper Component
function AIrecommendations({selected}) {
  const { data, isLoading, isError } = useGetAIrecommendationsData(selected);

  return (
    <>
      <div className="border-b p-2 flex items-center gap-2 font-semibold text-gray-800">
        <TrendingUp color="#f2c10d" />
        AI Recommendations
      </div>

      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonRecommendationCard key={i} />)}
        
        {!isLoading && !isError &&
          data.map((rec, index) => <RecommendationCard key={index} {...rec} />)}
      </div>
    </>
  );
}

export default AIrecommendations;
