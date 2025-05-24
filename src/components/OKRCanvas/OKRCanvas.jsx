import React, { useEffect, useState, useCallback } from "react";
import { PlusCircle, Edit3, Trash2, Target as GoalIcon } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import { v4 as uuid } from "uuid";
import { useOKRStore } from "../../store/okrStore";
import { toast } from "react-toastify";

const quarters = ["Q3 2025", "Q4 2025", "Q1 2026"];

const OKRCanvas = ({ selected, department }) => {
  const departmentId = selected.replace(/\s+/g, "_");

  // Objective modal state
  const [showObjModal, setShowObjModal] = useState(false);
  const [newObjective, setNewObjective] = useState({ title: "", description: "" });

  // Local KR modal state
  const [openKRModal, setOpenKRModal] = useState(false);
  const [objectiveId, setObjectiveId] = useState("");
  const [krId, setKrId] = useState(null);

  const {
    okrs,
    newKR,
    activeQuarter,
    setActiveQuarter,
    addObjective,
    deleteObjective,
    addKeyResult,
    editKeyResult,
    resetNewKR,
    deleteKeyResult,
    getObjectives,
    editKR,
    setNewKRField,
    closeKRModal,
  } = useOKRStore();

  const [objectives, setObjectives] = useState([]);

  // Sync objectives with store data
  useEffect(() => {
    setObjectives(getObjectives(selected, activeQuarter));
  }, [okrs, activeQuarter, selected, getObjectives]);

  const getProgress = (keyResults) => {
    if (!keyResults.length) return 0;
    const total = keyResults.reduce((acc, kr) => {
      const progress = Math.min(100, Math.round((kr.current / kr.target) * 100));
      return acc + progress;
    }, 0);
    return Math.round(total / keyResults.length);
  };

  const handleQuarterChange = (q) => {
    setActiveQuarter(q);
  };

  const handleAddObjective = () => {
    const newObj = {
      id: `obj-${Date.now()}`,
      title: newObjective.title,
      description: newObjective.description,
      keyResults: [],
    };
    addObjective(selected, activeQuarter, newObj);
    setNewObjective({ title: "", description: "" });
    setShowObjModal(false);
    toast.success("Objective Added!");
  };

  const handleDeleteKeyResult = useCallback((objectiveId, krId) => {
    deleteKeyResult(selected, activeQuarter, objectiveId, krId);
  }, [selected, activeQuarter, deleteKeyResult]);

  const handleAddOrEditKR = (e) => {
    e.preventDefault();
    const kr = {
      id: krId || `kr-${uuid()}`,
      title: newKR.title,
      current: Number(newKR.current),
      target: Number(newKR.target),
      unit: newKR.unit,
    };

    if (krId) {
      editKeyResult(selected, activeQuarter, objectiveId, kr);
      toast.success("Key Result Updated!");
    } else {
      addKeyResult(selected, activeQuarter, objectiveId, kr);
      toast.success("Key Result Added!");
    }

    setKrId(null);
    setObjectiveId("");
    closeKRModal();
    setOpenKRModal(false);
  };

  const handleAddNewKeyResult = (obj) => {
    setObjectiveId(obj?.id);
    setKrId(null); // Clear any previously edited KR
    setOpenKRModal(true);
  };

  const handleEditKeyResult = (objId, kr) => {
    resetNewKR({ title: kr.title, current: kr.current, target: kr.target, unit: kr.unit })
    setKrId(kr.id);
    setObjectiveId(objId);
    setOpenKRModal(true);
  };
  const handleCloseModal = ()=>{
    setOpenKRModal(false);
    resetNewKR({ title: "", current: "", target: "", unit: "" })
  }

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
              onClick={() => handleQuarterChange(q)}
              className={`px-4 py-1.5 text-sm rounded-full cursor-pointer ${
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
        {objectives &&
          objectives.map((obj, index) => {
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
                      <p className="text-sm text-slate-600">
                        {obj.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        deleteObjective(selected, activeQuarter, obj.id)
                        toast.success("Objective Deleted!")
                      }
                      }
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
                      <div
                        key={kr.id}
                        className="bg-slate-50 p-4 rounded-md border"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex gap-2 items-center">
                            <div className="h-6 w-6 bg-slate-200 rounded-full text-xs flex justify-center items-center">
                              {idx + 1}
                            </div>
                            <span className="font-medium text-slate-800">
                              {kr.title}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditKeyResult(obj.id, kr)}
                              className="text-slate-400 hover:text-blue-600"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>{
                                handleDeleteKeyResult(obj.id, kr.id)
                                toast.success("Key Result Deleted!")
                              }
                              }
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
                    onClick={() => handleAddNewKeyResult(obj)}
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
      {openKRModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 border">
          <div className="bg-white p-8 rounded-md w-[600px] border-black-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {editKR ? "Edit" : "Add"} Key Result
            </h3>
            <form className="space-y-4">
              <input
                placeholder="Title"
                value={newKR?.title}
                onChange={(e) => setNewKRField("title", e.target.value)}
                required
                className="w-full border border-slate-300 px-3 py-2 rounded-md"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Current"
                  value={newKR.current}
                  onChange={(e) => setNewKRField("current", e.target.value)}
                  required
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Target"
                  value={newKR.target}
                  onChange={(e) => setNewKRField("target", e.target.value)}
                  required
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
                <input
                  placeholder="Unit"
                  value={newKR.unit}
                  onChange={(e) => setNewKRField("unit", e.target.value)}
                  className="border border-slate-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseModal}
                  className="text-slate-600 cursor-pointer bg-gray-300 px-4 py-2 rounded-md"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddOrEditKR}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Objective Modal */}
      {showObjModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-md w-[650px]  border-black-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Add New Objective
            </h3>
            <input
              placeholder="Title"
              value={newObjective.title}
              onChange={(e) =>
                setNewObjective((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full border border-slate-300 px-3 py-2 rounded-md mb-3"
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={newObjective.description}
              onChange={(e) =>
                setNewObjective((p) => ({ ...p, description: e.target.value }))
              }
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
