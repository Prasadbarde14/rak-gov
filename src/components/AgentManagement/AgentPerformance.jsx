import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Activity, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { defaultAgents } from './Agents';
import useNetworkStore from '../../store/store';

const generateChartData = () => {

  const getMetrics = useNetworkStore(state => state.getMetrics);
  const metrics = getMetrics();
 
  function formatTo24Hour(timeString) {
  const date = new Date(timeString);
  
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // months are 0-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

  return metrics.history.map(i=>({
    time:formatTo24Hour(i.time),
    accuracy:i.successRate,
    latency:i.executionTime,
    errors:i.errorRate,
  }))

};

const getEChartOption = (data) => ({

  tooltip: { trigger: 'axis' },
  legend: { data: ['Accuracy (%)', 'Latency (ms)', 'Errors'] },
  xAxis: { type: 'category', data: data.map((d) => d.time) },
  yAxis: [
    { type: 'value', name: 'Accuracy (%)', position: 'left' },
    { type: 'value', name: 'Latency / Errors', position: 'right' }
  ],
  series: [
    {
      name: 'Accuracy (%)',
      type: 'line',
      data: data.map((d) => d.accuracy),
      smooth: true,
      yAxisIndex: 0,
      lineStyle: { color: '#4F46E5' }
    },
    {
      name: 'Latency (ms)',
      type: 'line',
      data: data.map((d) => d.latency),
      smooth: true,
      yAxisIndex: 1,
      lineStyle: { color: '#10B981' }
    },
    {
      name: 'Errors',
      type: 'line',
      data: data.map((d) => d.errors),
      smooth: true,
      yAxisIndex: 1,
      lineStyle: { color: '#EF4444' }
    }
  ]
});

const AgentPerformance = () => {
  const getMetrics = useNetworkStore(state => state.getMetrics);
  const metrics = getMetrics();
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Agent Performance Metrics</h2>
        <p className="text-slate-600">Monitor real-time performance and system health</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {defaultAgents.map((agent) => {
          const chartData = generateChartData();

          return (
            <div key={agent.id} className="bg-white rounded-lg border border-slate-200 p-6">
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-medium text-slate-900">{agent.name}</h3>
                  <p className="text-sm text-slate-500">Performance Overview</p>
                </div>
                <select className="text-sm border border-slate-200 rounded-md px-2 py-1">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MetricCard icon={<Activity className="h-4 w-4 mr-1" />} label="Accuracy" value={`${(metrics.successRate)}%`} />
                <MetricCard icon={<Clock className="h-4 w-4 mr-1" />} label="Avg. Latency" value={`${metrics.avgLatency}ms`} />
                <MetricCard icon={<TrendingUp className="h-4 w-4 mr-1" />} label="Throughput" value={`${metrics.throughput}/s`} />
                <MetricCard icon={<AlertTriangle className="h-4 w-4 mr-1" />} label="Error Rate" value={`${metrics.errorRate}%`} />
              </div>

              {/* Line Chart */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-4">Performance Trends</h4>
                <div className="h-72 bg-slate-50 rounded-lg p-4">
                  <ReactECharts option={getEChartOption(chartData)} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              {/* Alerts */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4">Recent Alerts</h4>
                <div className="space-y-3">
                  {[
                    { type: 'warning', message: 'High latency detected', time: '5 minutes ago' },
                    { type: 'error', message: 'Failed prediction attempt', time: '15 minutes ago' },
                    { type: 'info', message: 'Model accuracy improved', time: '1 hour ago' }
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-3 ${
                            alert.type === 'error'
                              ? 'bg-red-500'
                              : alert.type === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                        ></div>
                        <span className="text-sm text-slate-700">{alert.message}</span>
                      </div>
                      <span className="text-xs text-slate-500">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Metric card component
const MetricCard = ({ icon, label, value }) => (
  <div className="bg-slate-50 rounded-lg p-4">
    <div className="flex items-center text-sm text-slate-600 mb-1">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-semibold text-slate-900">{value}</div>
  </div>
);

export default AgentPerformance;
