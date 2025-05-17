import React from "react";
import { Target, CheckCircle, Zap, TrendingUp } from "lucide-react";

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

const recommendations = [
  {
    type: "objective",
    title: "Implement predictive maintenance system for critical infrastructure",
    description:
      "Based on your increasing maintenance costs and emergency repair frequency",
    confidence: 92,
  },
  {
    type: "keyResult",
    title: "Reduce contractor onboarding time by 50%",
    description:
      "Would help address project delays caused by contractor availability issues",
    confidence: 85,
  },
  {
    type: "action",
    title:
      "Create cross-functional rapid response teams for high-priority projects",
    description: "To address the 15% increase in critical path delays this quarter",
    confidence: 88,
  },
];

const RecommendationCard = ({ type, title, description, confidence }) => {
  const style = cardStyles[type];

  return (
    <div
      className={`border-l-4 ${style.border} bg-white shadow-md p-4 rounded-md space-y-2 w-full`}
    >
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold uppercase">
        <span className="flex items-center gap-1">
          {style.icon}
          Suggested {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span className="text-gray-700 font-normal">
          {confidence}% confidence
        </span>
      </div>
      <div className="text-gray-900 font-semibold">{title}</div>
      <div className="bg-gray-100 text-sm text-gray-700 p-2 rounded-md">
        {description}
      </div>
      <button
        className={`w-full mt-1 text-sm ${style.text} font-medium border ${style.text} rounded-md py-1 hover:bg-opacity-10`}
      >
        + Add to plan
      </button>
    </div>
  );
};

function AIrecommendations() {
  return (
    <div>
      <div className="border-b p-2 flex items-center gap-2 font-semibold text-gray-800">
        <TrendingUp color="#f2c10d" />
        AI Recommendations
      </div>

      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} {...rec} />
        ))}
      </div>
    </div>
  );
}

export default AIrecommendations;
