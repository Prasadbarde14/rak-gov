import React from "react";
import ReactECharts from "echarts-for-react";
import { AlertCircle, Clock3, Cpu, GaugeCircle, TrendingUp } from "lucide-react";

const AgentPerformance = () => {
  const chartOptions = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Accuracy (%)", "Latency (ms)", "Errors"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`)
    },
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Accuracy (%)",
        type: "line",
        data: Array(24).fill().map(() => Math.floor(Math.random() * 10) + 90),
        color: "#6366F1"
      },
      {
        name: "Latency (ms)",
        type: "line",
        data: Array(24).fill().map(() => Math.floor(Math.random() * 40) + 110),
        color: "#10B981"
      },
      {
        name: "Errors",
        type: "line",
        data: Array(24).fill().map(() => Math.floor(Math.random() * 3)),
        color: "#EF4444"
      }
    ]
  };

  const alerts = [
    { id: 1, time: "10:32 AM", message: "Low accuracy detected", type: "warning" },
    { id: 2, time: "11:15 AM", message: "Latency spiked above threshold", type: "critical" },
    { id: 3, time: "12:50 PM", message: "Throughput stable", type: "info" }
  ];

  return (
    <div className="p-6 rounded-xl shadow-md bg-white space-y-6 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Goal Recommendation Agent</h2>
          <p className="text-sm text-gray-500">Performance Overview</p>
        </div>
        <select className="text-sm border rounded px-2 py-1">
          <option>Last 24 hours</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="flex justify-center text-indigo-500"><GaugeCircle size={16} /></div>
          <p className="text-xs text-gray-500">Accuracy</p>
          <p className="text-lg font-bold">0.0%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="flex justify-center text-sky-500"><Clock3 size={16} /></div>
          <p className="text-xs text-gray-500">Avg. Latency</p>
          <p className="text-lg font-bold">0ms</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="flex justify-center text-green-500"><TrendingUp size={16} /></div>
          <p className="text-xs text-gray-500">Throughput</p>
          <p className="text-lg font-bold">450/s</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="flex justify-center text-red-500"><AlertCircle size={16} /></div>
          <p className="text-xs text-gray-500">Error Rate</p>
          <p className="text-lg font-bold">0.0%</p>
        </div>
      </div>

      {/* Chart */}
      <div>
        <h3 className="text-sm font-medium mb-2">Performance Trends</h3>
        <ReactECharts option={chartOptions} style={{ height: "300px", width: "100%" }} />
      </div>

      {/* Recent Alerts */}
      <div>
        <h3 className="text-sm font-medium mb-2">Recent Alerts</h3>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-center gap-2 text-sm">
              <AlertCircle
                className={`w-4 h-4 ${
                  alert.type === "warning"
                    ? "text-yellow-500"
                    : alert.type === "critical"
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              />
              <span className="text-gray-700">{alert.message}</span>
              <span className="ml-auto text-xs text-gray-400">{alert.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgentPerformance;
