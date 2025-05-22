import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Edit3,
  Trash2,
  EqualIcon as GoalIcon,
  Users,
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

const objectives = {
  maintenance_dept: [
    {
      id: 'obj-1',
      title: 'Improve Maintenance Turnaround Time',
      description: 'Reduce average turnaround time for scheduled maintenance by 20%.',
      progress: 45,
      keyResults: [
        {
          id: 'kr-1',
          title: 'Reduce maintenance backlog by 30%',
          current: 70,
          target: 100,
          unit: '%',
          progress: 50
        },
        {
          id: 'kr-2',
          title: 'Improve technician response time',
          current: 2,
          target: 1,
          unit: 'hrs',
          progress: 40
        }
      ]
    },
    {
      id: 'obj-2',
      title: 'Increase Equipment Uptime',
      description: 'Ensure key assets have uptime above 95% through preventive actions.',
      progress: 60,
      keyResults: [
        {
          id: 'kr-3',
          title: 'Conduct 100% of planned preventive maintenance',
          current: 80,
          target: 100,
          unit: '%',
          progress: 80
        }
      ]
    }
  ]
};


const OKRCanvas = ({selected,department}) => {
  const departmentId = "maintenance_dept";
  

  const [activePersona, setActivePersona] = useState(department.personas[0]);
  const [showNewKRModal, setShowNewKRModal] = useState(false);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState(null);
  const departmentObjectives = objectives[departmentId];

  const handleAddKeyResult = (objectiveId) => {
    setSelectedObjectiveId(objectiveId);
    setShowNewKRModal(true);
  };

  const filteredObjectives = departmentObjectives.filter((obj) => {
    if (activePersona === "Planning Analyst") {
      return (
        obj.title.toLowerCase().includes("project") ||
        obj.title.toLowerCase().includes("milestone")
      );
    } else if (activePersona === "Maintenance Head") {
      return (
        obj.title.toLowerCase().includes("maintenance") ||
        obj.title.toLowerCase().includes("repair")
      );
    }
    return true;
  });

  useEffect(()=>{
    setActivePersona(selected);
  },[selected])

  return (
    <div className="h-full">
      <div className="pt-2 pb-4">
        <Breadcrumbs
          items={[
            { label: "Departments", href: "/" },
            { label: department.name, href: `/` },
            { label: "OKR Canvas" },
          ]}
        />
      </div>

      <div className="mb-6 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <GoalIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-medium text-slate-800">OKR Canvas</h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-slate-400" />
              <select
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value)}
                className="text-sm text-slate-600 bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                {department.personas.map((persona) => (
                  <option key={persona} value={persona}>
                    {persona}
                  </option>
                ))}
              </select>
            </div> */}
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Objective
            </button>
          </div>
        </div>

        <p className="text-slate-600 mb-4">
          Track and manage your department's objectives and key results. Create
          new objectives or modify existing ones to align with strategic
          priorities.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm">
            <span className="font-medium">Q3 2025</span>
          </div>
          <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
            <span>Q4 2025</span>
          </div>
          <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
            <span>Q1 2026</span>
          </div>
          <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm">
            <span>+ Add Quarter</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {filteredObjectives.map((objective, index) => (
          <div
            key={objective.id}
            className="bg-white rounded-lg border border-slate-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 bg-blue-500"
                >
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-slate-800">
                  {objective.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100">
                  <Edit3 className="h-5 w-5" />
                </button>
                <button className="p-1 text-slate-400 hover:text-red-600 rounded-full hover:bg-slate-100">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-slate-600 mb-4 ml-11">{objective.description}</p>

            <div className="ml-11">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-slate-700">
                    Progress
                  </h4>
                  <div className="text-sm text-slate-500">
                    {Math.round(objective.progress)}% Complete
                  </div>
                </div>
                <div className="mt-1 h-2 relative max-w-xl rounded-full overflow-hidden">
                  <div className="w-full h-full bg-slate-200 absolute"></div>
                  <div
                    className={`h-full ${
                      objective.progress >= 66
                        ? "bg-green-500"
                        : objective.progress >= 33
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } absolute transition-all duration-500 ease-in-out`}
                    style={{ width: `${objective.progress}%` }}
                  ></div>
                </div>
              </div>

              <h4 className="text-sm font-medium text-slate-700 mb-3">
                Key Results
              </h4>
              <div className="space-y-4">
                {objective.keyResults.map((kr, krIndex) => (
                  <div
                    key={kr.id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium mr-2">
                          {krIndex + 1}
                        </div>
                        <h5 className="font-medium text-slate-800">
                          {kr.title}
                        </h5>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-blue-600 rounded-full hover:bg-white">
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="text-slate-600">
                        Current: {kr.current}
                        {kr.unit}
                      </div>
                      <div className="text-slate-600">
                        Target: {kr.target}
                        {kr.unit}
                      </div>
                    </div>

                    <div className="h-2 relative rounded-full overflow-hidden">
                      <div className="w-full h-full bg-slate-200 absolute"></div>
                      <div
                        className={`h-full ${
                          kr.progress >= 66
                            ? "bg-green-500"
                            : kr.progress >= 33
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } absolute transition-all duration-500 ease-in-out`}
                        style={{ width: `${kr.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handleAddKeyResult(objective.id)}
                  className="flex items-center justify-center w-full py-3 border border-dashed border-slate-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Add Key Result</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="flex items-center justify-center py-6 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors">
          <PlusCircle className="h-5 w-5 mr-2" />
          <span className="text-base font-medium">Add New Objective</span>
        </button>
      </div>

      {showNewKRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px]">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
              Add Key Result
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder="Enter key result title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter target value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="e.g., %, days, count"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewKRModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Key Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OKRCanvas;
