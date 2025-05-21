import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  RefreshCw,
  Users,
} from 'lucide-react';

const personaOptions = ['Director of Infrastructure'];
const filters = [
  { label: 'All KPIs', color: 'bg-green-50 text-green-700' },
  { label: 'At Risk', color: 'bg-slate-100 text-slate-600', count: 2, badge: 'bg-red-500' },
  { label: 'On Track', color: 'bg-slate-100 text-slate-600', count: 1, badge: 'bg-green-500' },
  { label: 'Needs Attention', color: 'bg-slate-100 text-slate-600', count: 1, badge: 'bg-yellow-500' },
];

const kpis = [
  {
    id: 'pw-1',
    name: 'Average project delay',
    value: 12.3,
    target: 9,
    unit: 'days',
    trend: 'down',
    isGood: true,
    attention: true,
    color: 'bg-green-500',
  },
  {
    id: 'pw-2',
    name: 'Milestones met on time',
    value: 78,
    target: 90,
    unit: '%',
    trend: 'up',
    isGood: true,
    attention: false,
    color: 'bg-yellow-500',
  },
  {
    id: 'pw-3',
    name: 'Contractor response time',
    value: 8.5,
    target: 6,
    unit: 'hours',
    trend: 'down',
    isGood: true,
    attention: true,
    color: 'bg-green-500',
  },
  {
    id: 'pw-4',
    name: 'High-risk defects identified',
    value: 24,
    target: 30,
    unit: 'count',
    trend: 'up',
    isGood: true,
    attention: false,
    color: 'bg-yellow-500',
  },
];

const KPImonitoringBoard = () => {
  const [persona, setPersona] = useState(personaOptions[0]);
  const [selected, setSelected] = useState(kpis[0]);

  const getTrendIcon = (trend, isGood) => {
    if (trend === 'up') return <ArrowUpRight className={`h-4 w-4 ${isGood ? 'text-green-500' : 'text-red-500'}`} />;
    if (trend === 'down') return <ArrowDownRight className={`h-4 w-4 ${isGood ? 'text-green-500' : 'text-red-500'}`} />;
    return null;
  };

  return (
    <div className="w-full px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-lg shadow-sm px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-slate-800 text-xl font-semibold">
            <BarChart3 className="text-purple-600 w-5 h-5 mr-2" />
            KPI Monitoring Board
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center text-slate-600 text-sm gap-2">
              <Users className="w-4 h-4" />
              <select
                className="bg-transparent border-none focus:ring-0 cursor-pointer"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
              >
                {personaOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-100 text-slate-600 rounded-md px-3 py-1.5 text-sm flex items-center">
              <RefreshCw className="w-4 h-4 mr-1" />
              Last updated: Just now
            </div>

            <button className="bg-slate-800 hover:bg-slate-900 text-white py-1.5 px-4 text-sm rounded-md font-medium">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {filters.map((filter) => (
            <div
              key={filter.label}
              className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${filter.color}`}
            >
              {filter.label}
              {filter.count && (
                <span className={`ml-2 ${filter.badge} text-white w-5 h-5 text-xs rounded-full flex items-center justify-center`}>
                  {filter.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-6">
        {kpis.map((kpi) => {
          const progress = Math.round((kpi.value / kpi.target) * 100);

          return (
            <div
              key={kpi.id}
              onClick={() => setSelected(kpi)}
              className={`rounded-lg border bg-white transition-all duration-200 ${
                selected.id === kpi.id ? 'border-indigo-500 shadow-md' : 'border-slate-200 shadow-sm hover:border-indigo-300'
              }`}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <div className="text-slate-800 font-semibold">{kpi.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{kpi.id}</span>
                  {kpi.attention && (
                    <div className="flex items-center text-orange-500 text-xs font-medium">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Needs attention
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">{kpi.value}</span>
                  <span className="text-base text-slate-500">{kpi.unit}</span>
                  <div className="ml-4 flex items-center text-sm font-medium">
                    {getTrendIcon(kpi.trend, kpi.isGood)}
                    <span className={kpi.isGood ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>vs last period</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Progress to target</span>
                    <span className="font-medium text-slate-700">{progress}%</span>
                  </div>
                  <div className="relative w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`absolute left-0 top-0 h-full rounded-full ${kpi.color}`} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>
                    Target: {kpi.target}
                    {kpi.unit}
                  </span>
                  <span>Updated: 20/05/2025</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KPImonitoringBoard;
