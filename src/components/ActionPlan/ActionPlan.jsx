import React, { useEffect, useState } from 'react';
import { actions } from './actions';
import ActionItem from './ActionItem';
import RecommendationCard from './RecommendationCard';
import { recommendations } from './recommendations';
import { ClipboardList, PlusCircle, Filter, CheckCircle2, AlertCircle, Clock, Users } from 'lucide-react';
import Breadcrumbs from '../OKRCanvas/Breadcrumbs';
import CreateActionCard from './CreateActionCard';

const ActionPlan = ({ department, departmentId='public-works',selected }) => {
  const [activePersona, setActivePersona] = useState(department.personas[0]);
  const [showNewActionModal, setShowNewActionModal] = useState(false);
  const departmentActions = actions[departmentId];
  const departmentRecommendations = recommendations[departmentId];

  const handleNewAction = () => {
    setShowNewActionModal(true);
  };

  const filteredActions = departmentActions?.filter(action => {
    if (activePersona === 'Planning Analyst') {
      return action.title.toLowerCase().includes('project') || 
             action.title.toLowerCase().includes('milestone') ||
             action.title.toLowerCase().includes('tracking');
    } else if (activePersona === 'Maintenance Head') {
      return action.title.toLowerCase().includes('maintenance') || 
             action.title.toLowerCase().includes('repair') ||
             action.title.toLowerCase().includes('contractor');
    }
    return true;
  });

  const pendingActions = filteredActions.filter(a => a.status === 'pending');
  const inProgressActions = filteredActions.filter(a => a.status === 'in-progress');
  const completedActions = filteredActions.filter(a => a.status === 'completed');

  useEffect(()=>{
    setActivePersona(selected)
  },[selected]);

  return (
    <div className="h-full p-2">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Departments', href: '/' },
            { label: department.name, href: `/${departmentId}` },
            { label: 'Action Plan' }
          ]}
        />
      </div>

      <div className="mb-6 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-medium text-slate-800">Action Plan</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-slate-400" />
              <select
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value)}
                className="text-sm text-slate-600 bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                {department.personas.map(persona => (
                  <option key={persona} value={persona}>{persona}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleNewAction}
              className="flex items-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Action
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm">
              <span className="font-medium">All Actions</span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>Pending</span>
              <span className="ml-1.5 bg-slate-200 text-slate-800 h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {pendingActions.length}
              </span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
              <span>In Progress</span>
              <span className="ml-1.5 bg-blue-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {inProgressActions.length}
              </span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Completed</span>
              <span className="ml-1.5 bg-green-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {completedActions.length}
              </span>
            </div>
          </div>
          
          <button className="flex items-center text-slate-600 hover:text-slate-800">
            <Filter className="h-4 w-4 mr-1.5" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">In Progress</h3>
            {inProgressActions.map(action => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">Pending</h3>
            {pendingActions.map(action => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
          
          <div>
            <h3 className="font-medium text-slate-800 mb-4">Completed</h3>
            {completedActions.map(action => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-slate-800 mb-4">AI Recommendations</h3>
          {departmentRecommendations
            .filter(r => {
              if (activePersona === 'Planning Analyst') {
                return r.content.toLowerCase().includes('project') || r.content.toLowerCase().includes('milestone');
              } else if (activePersona === 'Maintenance Head') {
                return r.content.toLowerCase().includes('maintenance') || r.content.toLowerCase().includes('repair');
              }
              return r.type === 'action';
            })
            .map(recommendation => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-slate-800 mb-2">Success Metrics</h4>
            <p className="text-sm text-slate-600 mb-4">
              Actions are tracked against department KPIs to measure effectiveness and impact.
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">High Impact Actions</span>
                  <span className="font-medium text-slate-800">66% Complete</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full">
                  <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">Medium Impact Actions</span>
                  <span className="font-medium text-slate-800">33% Complete</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full">
                  <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">Low Impact Actions</span>
                  <span className="font-medium text-slate-800">0% Complete</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full">
                  <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewActionModal && (
        <CreateActionCard setShowNewActionModal = {setShowNewActionModal}/>
      )}
    </div>
  );
};

export default ActionPlan;
