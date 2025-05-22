import React from 'react';
import {
  CheckCircle,
  CircleAlert,
  Plus,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const RecommendationCard = ({data,index }) => {

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

  const {type, title, description, confidence }=data;
  const style = cardStyles[type];
  return (
    <div key={index}
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

export default RecommendationCard;
