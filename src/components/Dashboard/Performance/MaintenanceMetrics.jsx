import React from "react";
import ReactECharts from "echarts-for-react";
import { ClipboardList } from "lucide-react";
import { useGetGraphsData } from "../../../API/Query/query";

const MaintenanceMetrics = () => {
  const graphData = useGetGraphsData();

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
      data: graphData.data?.data?.map((item) => item.date) || [],
      axisLabel: {
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
        data: graphData.data?.contractorResponseData || [],
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#9FF486",
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
        data: graphData.data?.data?.map((item) => item.value) || [],
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#c7d2fe",
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
    <div className="bg-white space-y-6 p-4 mt-5 rounded w-full shadow">
      <div className="flex items-center mb-4">
        <ClipboardList className="text-purple-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Maintenance Metrics</h2>
      </div>
      {graphData.isLoading ? (
        <div className="animate-pulse bg-gray-200 h-80 rounded w-full"></div>
      ) : (
        <div className="w-5/6 mx-auto">
          <ReactECharts
            option={option}
            style={{ height: "350px", width: "100%", padding: "1rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default MaintenanceMetrics;
