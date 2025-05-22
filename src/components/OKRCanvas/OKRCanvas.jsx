import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Edit3,
  Trash2,
  Target as GoalIcon,
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

// Initial data
const quarters = ["Q3 2025", "Q4 2025", "Q1 2026"];

const initialObjectives = {
  Director_of_Infrastructure: {
    "Q3 2025": [
      {
        id: "obj-1",
        title: "Improve Infrastructure Turnaround Time",
        description:
          "Reduce average turnaround time for scheduled maintenance by 20%.",
        keyResults: [
          {
            id: "kr-1",
            title: "Reduce maintenance backlog by 30%",
            current: 70,
            target: 100,
            unit: "%",
          },
        ],
      },
    ],
    "Q4 2025": [],
    "Q1 2026": [],
  },
  Planning_Analyst: {
    "Q3 2025": [],
    "Q4 2025": [],
    "Q1 2026": [],
  },
  Maintenance_Head: {
    "Q3 2025": [],
    "Q4 2025": [],
    "Q1 2026": [],
  },
};

const OKRCanvas = ({ selected, department }) => {
  const departmentId = selected.replace(/\s+/g, "_");
  const [objectives, setObjectives] = useState(initialObjectives);
  const [activeQuarter, setActiveQuarter] = useState(quarters[0]);

  const [showKRModal, setShowKRModal] = useState(false);
  const [showObjModal, setShowObjModal] = useState(false);

  const [selectedObjectiveId, setSelectedObjectiveId] = useState(null);
  const [editKR, setEditKR] = useState(null);

  const [newObjective, setNewObjective] = useState({ title: "", description: "" });
  const [newKR, setNewKR] = useState({ title: "", current: "", target: "", unit: "" });

  const getProgress = (keyResults) => {
    if (!keyResults.length) return 0;
    const total = keyResults.reduce((acc, kr) => {
      const progress = Math.min(100, Math.round((kr.current / kr.target) * 100));
      return acc + progress;
    }, 0);
    return Math.round(total / keyResults.length);
  };

  const updateObjectives = (updater) => {
    setObjectives((prev) => ({
      ...prev,
      [departmentId]: {
        ...prev[departmentId],
        [activeQuarter]: updater(prev[departmentId][activeQuarter]),
      },
    }));
  };

  const handleAddObjective = () => {
    const newObj = {
      id: `obj-${Date.now()}`,
      title: newObjective.title,
      description: newObjective.description,
      keyResults: [],
    };
    updateObjectives((objs) => [...objs, newObj]);
    setNewObjective({ title: "", description: "" });
    setShowObjModal(false);
  };

  const handleDeleteObjective = (id) => {
    updateObjectives((objs) => objs.filter((obj) => obj.id !== id));
  };

  const handleAddOrEditKR = (e) => {
    e.preventDefault();
    const kr = {
      id: editKR?.id || `kr-${Date.now()}`,
      title: newKR.title,
      current: Number(newKR.current),
      target: Number(newKR.target),
      unit: newKR.unit,
    };

    updateObjectives((objs) =>
      objs.map((obj) => {
        if (obj.id === selectedObjectiveId) {
          const updatedKeyResults = editKR
            ? obj.keyResults.map((k) => (k.id === editKR.id ? kr : k))
            : [...obj.keyResults, kr];
          return { ...obj, keyResults: updatedKeyResults };
        }
        return obj;
      })
    );

    setShowKRModal(false);
    setNewKR({ title: "", current: "", target: "", unit: "" });
    setEditKR(null);
  };

  const handleDeleteKR = (objId, krId) => {
    updateObjectives((objs) =>
      objs.map((obj) =>
        obj.id === objId
          ? {
              ...obj,
              keyResults: obj.keyResults.filter((kr) => kr.id !== krId),
            }
          : obj
      )
    );
  };

  return (
    <div className="h-full p-4">
      <div className="pb-5">
      <Breadcrumbs
        items={[
          { label: "Departments", href: "/" },
          { label: department.name, href: "/" },
          { label: "OKR Canvas" },
        ]}
      />
      </div>
     

      {/* Header */}
      <div className="bg-white p-6 rounded-md border shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xl">
            <GoalIcon className="text-blue-600" />
            OKR Canvas
          </div>
          <button
            onClick={() => setShowObjModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            New Objective
          </button>
        </div>
        <p className="text-slate-600 text-sm mt-2 mb-4">
          Track and manage your department's objectives and key results.
        </p>
        <div className="flex gap-3">
          {quarters.map((q) => (
            <button
              key={q}
              onClick={() => setActiveQuarter(q)}
              className={`px-4 py-1.5 text-sm rounded-full ${
                activeQuarter === q
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="space-y-6">
        {(objectives[departmentId]?.[activeQuarter] || []).map((obj, index) => {
          const objProgress = getProgress(obj.keyResults);
          return (
            <div
              key={obj.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">
                      {obj.title}
                    </h3>
                    <p className="text-sm text-slate-600">{obj.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteObjective(obj.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-3 mb-5">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Progress</span>
                  <span>{objProgress}% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${objProgress}%` }}
                  />
                </div>
              </div>

              {/* Key Results */}
              <div className="space-y-4">
                {obj.keyResults.map((kr, idx) => {
                  const progress = Math.min(
                    100,
                    Math.round((kr.current / kr.target) * 100)
                  );
                  return (
                    <div key={kr.id} className="bg-slate-50 p-4 rounded-md border">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-slate-200 rounded-full text-xs flex justify-center items-center">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-slate-800">{kr.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedObjectiveId(obj.id);
                              setEditKR(kr);
                              setNewKR(kr);
                              setShowKRModal(true);
                            }}
                            className="text-slate-400 hover:text-blue-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKR(obj.id, kr.id)}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500 mb-1">
                        <span>
                          Current: {kr.current}
                          {kr.unit}
                        </span>
                        <span>
                          Target: {kr.target}
                          {kr.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => {
                    setSelectedObjectiveId(obj.id);
                    setEditKR(null);
                    setNewKR({ title: "", current: "", target: "", unit: "" });
                    setShowKRModal(true);
                  }}
                  className="flex items-center justify-center w-full py-3 border border-dashed border-slate-300 rounded-lg text-blue-600 hover:bg-blue-50"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Add Key Result
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* KR Modal */}
      {showKRModal && (
       <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[500px] border">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {editKR ? "Edit" : "Add"} Key Result
            </h3>
            <form onSubmit={handleAddOrEditKR} className="space-y-4">
              <input
                placeholder="Title"
                value={newKR.title}
                onChange={(e) => setNewKR((p) => ({ ...p, title: e.target.value }))}
                required
                className="w-full border border-slate-300 px-3 py-2 rounded-md"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Current"
                  value={newKR.current}
                  onChange={(e) => setNewKR((p) => ({ ...p, current: e.target.value }))}
                  required
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Target"
                  value={newKR.target}
                  onChange={(e) => setNewKR((p) => ({ ...p, target: e.target.value }))}
                  required
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
                <input
                  placeholder="Unit"
                  value={newKR.unit}
                  onChange={(e) => setNewKR((p) => ({ ...p, unit: e.target.value }))}
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowKRModal(false)}
                  className="text-slate-600 cursor-pointer bg-gray-300 px-4 py-2 rounded-md"
                  type="button"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Objective Modal */}
      {showObjModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[500px]">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Objective</h3>
            <input
              placeholder="Title"
              value={newObjective.title}
              onChange={(e) => setNewObjective((p) => ({ ...p, title: e.target.value }))}
              className="w-full border border-slate-300 px-3 py-2 rounded-md mb-3"
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={newObjective.description}
              onChange={(e) => setNewObjective((p) => ({ ...p, description: e.target.value }))}
              className="w-full border border-slate-300 px-3 py-2 rounded-md"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowObjModal(false)}
                className="text-slate-600 cursor-pointer bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddObjective}
                className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OKRCanvas;

