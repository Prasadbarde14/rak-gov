import React from 'react';
import { Calendar, User, AlertTriangle } from 'lucide-react';

const ActionItem = ({ action }) => {
  const getStatusBadge = () => {
    switch (action.status) {
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded">
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getImpactBadge = () => {
    switch (action.impact) {
      case 'high':
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High Impact
          </span>
        );
      case 'medium':
        return (
          <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded">
            Medium Impact
          </span>
        );
      case 'low':
        return (
          <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded">
            Low Impact
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-slate-900">{action.title}</h3>
        {getStatusBadge()}
      </div>

      <p className="text-sm text-slate-600 mb-4">{action.description}</p>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center text-xs text-slate-500">
          <User className="h-3 w-3 mr-1" />
          {action.assignee}
        </div>

        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          Due: {new Date(action.dueDate).toLocaleDateString()}
        </div>

        {getImpactBadge()}
      </div>
    </div>
  );
};

export default ActionItem;
