import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import SimulationSliders from "../Dashboard/Performance/SimulationSliders";
import { usePostGetKpiAnalysis } from "../../API/Query/query";
import { kpi } from "../../API/APICalls/mockCallApi";

const CrossDepartmentAnalysis = () => {
  const [parameters, setParameters] = useState({
    resourceAllocation: 0,
    processEfficiency: 0,
    staffingLevels: 0,
    technologyAdoption: 0,
    marketConditions: 0,
  });

  const [showSimulate, setShowSimulate] = useState(false);
  const [graph, setGraph] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState("");
  const fixchat={
  title: {
    text: 'KPI Target vs Current Comparison',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    data: ['Current Value', 'Target Value'],
    top: 30
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [
      'DirInfra: Avg Delay',
      'DirInfra: Milestones',
      'DirInfra: Response Time',
      'DirInfra: High-risk Defects',
      'PlanAnalyst: Avg Delay',
      'PlanAnalyst: Milestones',
      'PlanAnalyst: Budget Util.',
      'PlanAnalyst: Task Rate',
      'MaintHead: Response Time',
      'MaintHead: High-risk Defects'
    ],
    axisLabel: {
      rotate: 30
    }
  },
  yAxis: {
    type: 'value',
    name: 'Value'
  },
  series: [
    {
      name: 'Current Value',
      type: 'bar',
      data: [
        12.3, 78, 8.5, 24, // Director
        12.3, 78, 92, 75,  // Planning Analyst
        8.5, 24            // Maintenance Head
      ],
      itemStyle: {
        color: '#5470C6'
      }
    },
    {
      name: 'Target Value',
      type: 'bar',
      data: [
        9, 90, 6, 30,   // Director
        9, 90, 90, 80,  // Planning Analyst
        6, 30          // Maintenance Head
      ],
      itemStyle: {
        color: '#91CC75'
      }
    }
  ]
};

  const selected = "1";

  const kpiAnalysis = usePostGetKpiAnalysis(query, selected, enabled);

  const [analytics, setAnalytics] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    if (kpiAnalysis.isSuccess) {
      setEnabled(false); // stop further fetching
      setAnalytics(kpiAnalysis?.data?.analysis);
      setOptions((kpiAnalysis?.data?.option)?(kpiAnalysis?.data?.option):fixchat);
      setGraph(true);
      setShowSimulate(false);
     
    }
  }, [kpiAnalysis.isSuccess]);

const handleAnalysis = () => {
  setAnalytics("");
      setOptions("");
  const newQuery =
    "Help me analyse this data and give me suggestive measures: " +
    JSON.stringify(kpi) +
    " Also keep the following parameters in mind: " +
    JSON.stringify(parameters);

  setQuery(newQuery);
  console.log("newQuery",newQuery)
  setEnabled(false);     // Reset it first
   
  setTimeout(() => {
    setEnabled(true);    // Then re-enable after React registers state change
  }, 10);

  
};

  return (
    <div className=" px-4 relative">
     { showSimulate && <div className="absolute right-10 top-20 bg-slate-50 w-1/2 z-10 p-4 rounded-2xl">
     <p className="text-xl font-semibold">Simulation Parameters</p>
          <SimulationSliders
            parameters={parameters}
            setParameters={setParameters}
            colors={["#4F45E4","#E4E7EB"]}
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
            <button className="text-white text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md cursor-pointer" onClick={handleAnalysis}>
              Run Analysis
            </button>
          </div>
        </div>
        
        {/* Subheading */}
        {kpiAnalysis.isLoading && <div><div className="h-4 w-60 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-3 w-80 bg-slate-100 rounded animate-pulse"></div></div>}
        { graph && <div>
          <p className="text-sm text-slate-600 font-medium">
            Performance Comparison
          </p>
          <p className="text-sm text-slate-500">
            Comparing Average project delay across all departments
          </p>
        </div>}
        {kpiAnalysis.isLoading && <div className="w-full h-[400px] mt-2 overflow-x-auto">
          <div className="w-full h-full bg-slate-100 rounded-lg animate-pulse"></div>
        </div>}
        {/* Chart */}
       { graph && <div className="w-full h-[400px] overflow-x-auto">
          <ReactECharts
            option={options}
            style={{ height: "100%", width: "100%" }}
            className="mt-2"
          />
        </div>}

        {/* Footer */}
       { graph && <div>
          <p className="text-sm text-slate-600 font-medium mb-1">
            AI Analysis & Insights
          </p>
          <p className="text-sm text-slate-500">
            AI-driven recommendations for performance improvement
          </p>
          <p className="text-md text-slate-800 mt-6 justify-around">
            {analytics.length>0 && analytics?.map((item)=>{
              return<div className="p-2 mb-4 bg-slate-50 shadow-sm rounded-md  text-slate-800">
                <div className="flex justify-between items-center">
                <p className="font-semibold text-md text-black mb-2">{item.title}</p>
                <p className={`${item.priority=="High"?"text-red-400 bg-red-100":item.priority=="Low"?"text-yellow-500 bg-yellow-100":"text-orange-400 bg-orange-100"} font-semibold p-1 rounded-sm text-sm`}>{item.priority}</p>
                </div>
                <p><strong>Description: </strong>{item.desc}</p>
                <p className=" py-2"><strong>Suggestions: </strong>{item.suggestions}</p>
              </div>
            })}
          </p>
        </div>}
        {!graph && <div className="h-2 w-full"></div>}
      </div>
    </div>
  );
};

export default CrossDepartmentAnalysis;
