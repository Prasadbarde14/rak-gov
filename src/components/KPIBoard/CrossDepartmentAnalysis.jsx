import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import SimulationSliders from "../Dashboard/Performance/SimulationSliders";

const CrossDepartmentAnalysis = () => {
  const [parameters, setParameters] = useState({
    resourceAllocation: 0,
    processEfficiency: 0,
    staffingLevels: 0,
    technologyAdoption: 0,
    marketConditions: 0,
  });
  const [showSimulate, setShowSimulate] = useState(false);
  const departments = [
    "Director of Infrastructure",
    "Planning Analyst",
    "Maintenance Head",
  ];
  const currentValues = [13, 10, 10];
  const targetValues = [9, 6, 11];
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["Current Value", "Target"],
      bottom: 0,
    },
    grid: {
      top: 30,
      left: "3%",
      right: "4%",
      bottom: 50,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: departments,
      axisLabel: {
        interval: 0,
        rotate: 40,
        fontSize: 12,
        color: "#6B7280",
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Current Value",
        type: "bar",
        data: currentValues,
        itemStyle: { color: "#6366f1" }, // indigo-500
        barWidth: "30%",
      },
      {
        name: "Target",
        type: "bar",
        data: targetValues,
        itemStyle: { color: "#d1d5db" }, // slate-300
        barWidth: "30%",
      },
    ],
  };

  return (
    <div className=" px-4 relative">
     { showSimulate && <div className="absolute right-10 top-20 bg-slate-50 w-1/2 z-10 p-4 rounded-2xl">
     <p className="text-xl font-semibold">Simulation Parameters</p>
          <SimulationSliders
            parameters={parameters}
            setParameters={setParameters}
          />
      </div>}
      <div className="bg-white w-full border shadow-sm rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Cross-Department Analysis
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Compare performance metrics and simulate improvements across
              departments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="text-slate-700 text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer"
              onClick={() => setShowSimulate(!showSimulate)}
            >
              {!showSimulate ? "Show Simulation" : "Hide Simulate"}
            </button>
            <button className="text-white text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md cursor-pointer">
              Run Analysis
            </button>
          </div>
        </div>

        {/* Subheading */}
        <div>
          <p className="text-sm text-slate-600 font-medium">
            Performance Comparison
          </p>
          <p className="text-sm text-slate-500">
            Comparing Average project delay across all departments
          </p>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px] overflow-x-auto">
          <ReactECharts
            option={options}
            style={{ height: "100%", width: "100%" }}
            className="mt-2"
          />
        </div>

        {/* Footer */}
        <div>
          <p className="text-sm text-slate-600 font-medium mb-1">
            AI Analysis & Insights
          </p>
          <p className="text-sm text-slate-500">
            AI-driven recommendations for performance improvement
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Run analysis to get AI-powered recommendations
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrossDepartmentAnalysis;
