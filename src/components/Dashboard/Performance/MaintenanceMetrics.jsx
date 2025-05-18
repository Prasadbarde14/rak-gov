import React from "react";
import ReactECharts from "echarts-for-react";
import { ClipboardList } from "lucide-react";

const MaintenanceMetrics = () => {
  // Sample data points
  const data = [
    { date: "Jul 13, 2024", value: 24 },
    { date: "Aug 13, 2024", value: 22 },
    { date: "Sep 13, 2024", value: 20 },
    { date: "Oct 13, 2024", value: 16 },
    { date: "Nov 13, 2024", value: 18 },
    { date: "Dec 13, 2024", value: 19 },
    { date: "Jan 13, 2025", value: 15 },
    { date: "Feb 13, 2025", value: 20 },
    { date: "Mar 13, 2025", value: 26 },
    { date: "Apr 13, 2025", value: 20 },
    { date: "May 13, 2025", value: 14 },
  ];
  

  const contractorResponseData = [28, 27, 25, 22, 20, 21, 19, 23, 29, 25, 21]; // <-- Add your actual values here

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Contractor response time", "High-risk defects identified"],
      top: 10,
      textStyle: { color: "#555" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.date),
      axisLabel: {
        rotate: 20,
        fontSize: 11,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 32,
    },
    series: [
      {
        name: "Contractor response time",
        type: "line",
        data: contractorResponseData,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#9FF486", // black
          width: 3,
        },
        itemStyle: {
          color: "#9FF486",
        },
        areaStyle: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      {
        name: "High-risk defects identified",
        type: "line",
        data: data.map((item) => item.value),
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#c7d2fe", // light indigo
          width: 3,
        },
        itemStyle: {
          color: "#c7d2fe",
        },
        areaStyle: {
          color: "rgba(199, 210, 254, 0.1)",
        },
      },
    ],
  };

  return (
    <div className="bg-white space-y-6 p-4 mt-5 rounded shadow">
      {/* Header */}
      <div className="flex items-center mb-4">
        <ClipboardList className="text-purple-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Maintenance Metrics
        </h2>
      </div>
      <div className="w-5/6 mx-auto ">
        <ReactECharts
          option={option}
          style={{ height: "350px", width: "100%", padding: "1rem" }}
        />
      </div>
    </div>
  );
};

export default MaintenanceMetrics;
