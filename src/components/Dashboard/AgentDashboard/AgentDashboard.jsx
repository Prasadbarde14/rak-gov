import React, { useState } from 'react';
import { Bot, Brain, Activity, Settings2, Users } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import AgentOverview from './agent/AgentOverview';
import AgentTraining from './agent/AgentTraining';
import AgentPerformance from './agent/AgentPerformance';
import AgentInteractions from './agent/AgentInteractions';

const AgentDashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  const menuItems = [
    {
      id: 'overview',
      icon: Bot,
      label: 'Agent Overview',
      description: 'View and manage all active agents'
    },
    {
      id: 'training',
      icon: Brain,
      label: 'Training & Learning',
      description: 'Configure agent learning parameters'
    },
    {
      id: 'performance',
      icon: Activity,
      label: 'Performance',
      description: 'Monitor agent metrics and KPIs'
    },
    {
      id: 'interactions',
      icon: Users,
      label: 'Interactions',
      description: 'View agent-user interaction history'
    }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <AgentOverview />;
      case 'training':
        return <AgentTraining />;
      case 'performance':
        return <AgentPerformance />;
      case 'interactions':
        return <AgentInteractions />;
      default:
        return <AgentOverview />;
    }
  };

  return (
    <div className="h-full bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="px-6 py-4">
          <Breadcrumbs
            items={[
              { label: 'Settings', href: '/settings' },
              { label: 'Agent Management' }
            ]}
          />
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Agent Management</h1>
        </div>

        <div className="px-6 flex space-x-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-4 py-2 -mb-px flex items-center space-x-2 ${
                  activeView === item.id
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[calc(100vh-8rem)] overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default AgentDashboard;