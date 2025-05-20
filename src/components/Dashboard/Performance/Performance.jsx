import React, { useEffect, useState } from "react";
import { CirclePlay, Settings2, Brain, TriangleAlert } from "lucide-react";
import { useGetPerformanceMatrics } from "../../../API/Query/query";
import MetricCardSkeleton from "./MetricCardSkeleton";
import SimulationSliders from "./SimulationSliders";
import { usePostGetSimmulationResult } from "../../../API/Mutation/mutation";
import MetricCard from "./MetricCard";

const Performance = ({ selected }) => {

  const [enabled,setEnabled]=useState(false)
  const [activeTab,setActiveTab]=useState("auto")
   const [parameters, setParameters] = useState({
    resourceAllocation: 0,
    processEfficiency: 0,
    staffingLevels: 0,
    technologyAdoption: 0,
    marketConditions: 0,
  });
  const AutoClickHandler = ()=>{
    setActiveTab("auto")
    
  }
  const mutatePerformaceData = usePostGetSimmulationResult("Here are some simulation parameters"+JSON.stringify(parameters)+"Now give performance matrix for ", selected,enabled)

  useEffect(()=>{
    if(mutatePerformaceData.isSuccess)
        setEnabled(false)
  },[mutatePerformaceData])

  return (
    <div className="space-y-6 bg-white p-4 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex gap-2 items-center">
          <span>
            <CirclePlay className="text-green-600" />
          </span>
          Performance Simulation
        </h2>

        {/* Tab & Run Button */}
        <div className="flex gap-2">
          {/* Tabs */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden p-1">
            <button
              className={`flex items-center gap-1 px-2 py-1 text-sm rounded cursor-pointer ${
                activeTab === "auto"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
              onClick={AutoClickHandler}
            >
              <Brain className="w-4 h-4" />
              Auto
            </button>
            <button
              className={`flex items-center gap-1 px-2 py-1 text-sm rounded cursor-pointer ${
                (activeTab === "manual")
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("manual")}
            >
              <Settings2 className="w-4 h-4" />
              Manual
            </button>
          </div>
          <button disabled={mutatePerformaceData.isLoading} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded flex gap-1 items-center cursor-pointer" onClick={() => 
            
            setEnabled(true)}>
            {
              !mutatePerformaceData.isLoading ?
                <>
                  <CirclePlay className="w-4 h-4" />
                  Run Simulation
                </>
                :
                <>
                  Loading...
                </>
            }
          </button>
        </div>
      </div>
      {activeTab=="manual" && <SimulationSliders parameters={parameters} setParameters={setParameters}/>}

      <hr className="border border-gray-100" />
      <h3 className=" font-semibold">Simulation Results</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
        {mutatePerformaceData?.data && mutatePerformaceData.data.map((i,indx)=><MetricCard key={indx} data={JSON.parse(i.data.text)}/>)}
      </div>
    </div>
  );
};

export default Performance;
