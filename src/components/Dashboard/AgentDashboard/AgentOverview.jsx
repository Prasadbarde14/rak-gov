import React from 'react';
import { defaultAgents } from '../../types/agents';
import { Bot, Activity, Brain, AlertTriangle } from 'lucide-react';

const AgentOverview = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Active Agents</h2>
        <p className="text-slate-600">Monitor and manage AI agents orchestrating your performance management system</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {defaultAgents.map(agent => (
          <div key={agent.id} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mr-4">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{agent.name}</h3>
                  <p className="text-sm text-slate-500">{agent.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                agent.status.state === 'idle' 
                  ? 'bg-slate-100 text-slate-600'
                  : agent.status.state === 'running'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {agent.status.state}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-sm text-slate-600 mb-1">
                  <Activity className="h-4 w-4 mr-1" />
                  Success Rate
                </div>
                <div className="text-2xl font-semibold text-slate-900">
                  {(agent.status.metrics.successRate * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-sm text-slate-600 mb-1">
                  <Brain className="h-4 w-4 mr-1" />
                  Execution Time
                </div>
                <div className="text-2xl font-semibold text-slate-900">
                  {agent.status.metrics.executionTime}ms
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-sm text-slate-600 mb-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Error Rate
                </div>
                <div className="text-2xl font-semibold text-slate-900">
                  {(agent.status.metrics.errorRate * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Active Capabilities</h4>
              <div className="space-y-2">
                {agent.capabilities.map(capability => (
                  <div key={capability.name} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{capability.name}</p>
                      <p className="text-xs text-slate-500">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentOverview;
