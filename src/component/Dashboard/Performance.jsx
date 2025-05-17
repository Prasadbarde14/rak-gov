import { CirclePlay, Settings2, Brain, TriangleAlert } from "lucide-react";

const metrics = [
  {
    title: "Average project delay",
    current: "12.3",
    predicted: "12.35",
    delta: "-0.4%",
    recommendations: [],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "Milestones met on time",
    current: "78",
    predicted: "78.32",
    delta: "-0.4%",
    recommendations: [
      {
        title: "Optimize processes for milestones met on time",
        desc: "Process efficiency improvements could help close the performance gap",
      },
      {
        title: "Accelerate technology adoption for milestones met on time",
        desc: "Increased automation and digital tools could improve performance",
      },
    ],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "Contractor response time",
    current: "8.5",
    predicted: "8.54",
    delta: "-0.5%",
    recommendations: [],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "High-risk defects identified",
    current: "24",
    predicted: "24.1",
    delta: "-0.4%",
    recommendations: [
      {
        title: "Optimize processes for high-risk defects identified",
        desc: "Process efficiency improvements could help close the performance gap",
      },
      {
        title:
          "Accelerate technology adoption for high-risk defects identified",
        desc: "Increased automation and digital tools could improve performance",
      },
    ],
    impactAnalysis: {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
];

const MetricCard = ({ title, current, predicted, delta, recommendations, impactAnalysis }) => (
  <div className=" p-4 rounded-xl shadow-sm bg-gray-50 space-y-1">
    <div className="flex justify-between items-center text-sm ">
      <div className="flex flex-col gap-1">
        <span>{title}</span>
        <div className="text-sm text-gray-600">Current: {current}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-red-500 font-semibold">{delta}</span>
        <div className="text-sm text-gray-600">Predicted: {predicted}</div>
      </div>
    </div>
    <hr className="border border-gray-100" />

    <div className="mt-2 space-y-1 text-sm">
    <div className="text-purple-600 font-semibold text-sm flex gap-1 items-center">
      <Brain className="w-4 h-4"/>
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
        <div className="text-purple-600 font-semibold text-sm flex gap-1 items-center">
          <Brain className="w-4 h-4"/>
          AI Recommendations
        </div>
        {recommendations.map((rec, idx) => (
          <div key={idx}>
            <div className="font-medium text-sm">{rec.title}</div>
            <div className="text-gray-500 text-xs">{rec.desc}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Performance = () => (
  <div className="p-4 space-y-6">
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
            <Settings2  className="w-4 h-4" />
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
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  </div>
);

export default Performance;
