import { CirclePlay, Settings2, Brain, TriangleAlert } from "lucide-react";
import { useGetPerformanceMatrics } from "../../../API/Query/query";
import MetricCardSkeleton from "./MetricCardSkeleton";

const MetricCard = ({
  title,
  current,
  predicted,
  delta,
  recommendations,
  impactAnalysis,
}) => (
  <div className=" p-4 rounded-xl shadow-sm bg-[#f8fafc] space-y-1">
    <div className="flex justify-between items-center text-sm ">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-gray-600">Current: {current}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-red-500 font-semibold">{delta}</span>
        <div className="text-sm text-gray-600">Predicted: {predicted}</div>
      </div>
    </div>
    <hr className="border border-gray-100" />

    <div className="mt-2 space-y-1 text-sm">
      <div className=" font-semibold text-sm flex gap-1 items-center">
        <Brain className="w-4 h-4 text-purple-600" />
        Impact Analysis
      </div>
      <div className="flex items-center text-green-600">
        <TriangleAlert size={14} className="mr-1" />
        {impactAnalysis?.performance}
      </div>
      <div className="flex items-center text-green-600">
        <TriangleAlert size={14} className="mr-1" />
        {impactAnalysis?.utilization}
      </div>
    </div>

    {recommendations.length > 0 && (
      <div className="mt-3 space-y-2">
        <div className=" font-semibold text-sm flex gap-1 items-center">
          <Brain className="w-4 h-4 text-purple-600" />
          AI Recommendations
        </div>
        {recommendations.map((rec, idx) => (
          <div key={idx}>
            <div className="font-medium text-sm flex gap-1 item-center">
              <TriangleAlert className="w-4 h-4 text-orange-400" />
              {rec.title}
            </div>
            <div className="text-gray-500 text-xs pl-5">{rec.desc}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Performance = () => {
  const performanceData = useGetPerformanceMatrics();
  const { data, isError, isLoading } = performanceData;

  return (
    <div className="space-y-6 bg-white rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex gap-2 items-center">
          <span>
            <CirclePlay className="text-green-600" />
          </span>
          Performance Simulation
        </h2>
        <div className="flex gap-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden p-1">
            <button className="flex items-center gap-1 px-2 py-1 text-sm bg-white hover:bg-gray-100 text-gray-700 rounded cursor-pointer">
              <Brain className="w-4 h-4" />
              Auto
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm bg-white hover:bg-gray-100 text-gray-700 rounded cursor-pointer">
              <Settings2 className="w-4 h-4" />
              Manual
            </button>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded flex gap-1 items-center cursor-pointer">
            <CirclePlay className="w-4 h-4" />
            Run Simulation
          </button>
        </div>
      </div>
      <hr className="border border-gray-100" />
      <h3 className=" font-semibold">Simulation Results</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, idx) => <MetricCardSkeleton key={idx} />)
          : data?.map((metric, idx) => <MetricCard key={idx} {...metric} />)}
      </div>
    </div>
  );
};

export default Performance;
