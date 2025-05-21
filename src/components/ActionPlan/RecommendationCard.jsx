import React from 'react';
import { Lightbulb, Plus, Info } from 'lucide-react';

const RecommendationCard = ({ recommendation }) => {
  const getTypeColor = () => {
    switch (recommendation.type) {
      case 'objective':
        return 'border-l-4 border-blue-500';
      case 'key-result':
        return 'border-l-4 border-green-500';
      case 'action':
        return 'border-l-4 border-amber-500';
      default:
        return '';
    }
  };

  const getTypeLabel = () => {
    switch (recommendation.type) {
      case 'objective':
        return 'Suggested Objective';
      case 'key-result':
        return 'Suggested Key Result';
      case 'action':
        return 'Suggested Action';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${getTypeColor()}`}>
      <div className="flex items-center mb-2">
        <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
        <span className="text-xs uppercase font-medium text-slate-500">{getTypeLabel()}</span>
        <span className="ml-auto text-xs text-slate-400">
          {Math.round(recommendation.confidence * 100)}% confidence
        </span>
      </div>

      <h3 className="font-medium text-slate-800 mb-2">{recommendation.content}</h3>

      <div className="bg-slate-50 p-2 rounded-md mb-3">
        <div className="flex items-start">
          <Info className="h-4 w-4 text-slate-400 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs text-slate-600">{recommendation.context}</p>
        </div>
      </div>

      <button className="w-full text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md py-1.5 flex items-center justify-center">
        <Plus className="h-4 w-4 mr-1" />
        Add to plan
      </button>
    </div>
  );
};

export default RecommendationCard;
