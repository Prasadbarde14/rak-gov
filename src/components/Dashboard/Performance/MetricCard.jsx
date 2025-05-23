import React, { useEffect, useRef, useState } from "react";
import {
  Brain,
  TriangleAlert,
  CheckSquare,
  Square,
  ChevronRight,
  Filter,
  NotebookPen,
  SquareChartGantt,
  ChartLine,
} from "lucide-react"; // or your icon library
import ProjectPlanningOverview from "../ProjectPlanningOverview.jsx/ProjectPlanningOverview";
import MaintenanceOverview from "./MaintenanceOverview";
import MaintenanceMetric from "./MaintenanceMetrics";
import { motion, AnimatePresence } from "framer-motion";

const MetricCard = ({ data, index, selected }) => {
  const { title, current, predicted, delta, recommendations, impactAnalysis } =
    data || {};

  const divRef = useRef(null)
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(()=>{
    if(divRef.current){
      divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },[selectedFields])


  const options = [
    {
      label:
        <div className="flex justify-between items-center gap-2 py-1.5">
          <NotebookPen color="#9810fa" size={20} />
          <p className="text-sm">
            Planning
          </p>
        </div>
      , value: "project"
    },
    {
      label:
        <div className="flex justify-between items-center gap-2 py-1.5">
          <SquareChartGantt color="#9810fa" size={20} />
          <p>
            Overview
          </p>
        </div>
      , value: "maintenanceOverview"
    },
    {
      label:
        <div className="flex justify-between items-center gap-2 py-1.5">
          <ChartLine color="#9810fa" size={20} />
          <p>
            Metric
          </p>
        </div>
      , value: "maintenanceMetric"
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleFieldChange = (value) => {
    setSelectedFields((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const renderSelectedComponent = (field) => {
    switch (field) {
      case "project":
        return (
          <div ref={divRef}>
            <ProjectPlanningOverview
              key="project"
              index={index}
              selected={selected}
              parentData={data}
            />
          </div>
        );
      case "maintenanceOverview":
        return (
          <div ref={divRef}>
            <MaintenanceOverview
              key="maintenanceOverview"
              index={index}
              selected={selected}
              parentData={data}
            />
          </div>
        );
      case "maintenanceMetric":
        return (
          <div ref={divRef}>
            <MaintenanceMetric
              key="maintenanceMetric"
              index={index}
              selected={selected}
              parentData={data}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-sm bg-[#f8fafc] space-y-2">
      {/* Header Section - Always Visible */}
      <div
        className="flex justify-between items-center text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className=" flex flex-row gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <div className="text-sm text-gray-600">Current: {current}</div>
          </div>
          {/* <Filter className="w-4 h-4 text-gray-400" /> */}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-red-500 font-semibold">{delta}</span>
          <div className="text-sm text-gray-600">Predicted: {predicted}</div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
          </motion.div>
        </div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-3 text-sm"
          >
            <hr className="border border-gray-100" />
            {/* Impact Analysis */}
            <div className="space-y-1">
              <div className="font-semibold flex gap-1 items-center">
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

            {/* AI Recommendations */}
            {recommendations?.length > 0 && (
              <div className="space-y-2">
                <div className="font-semibold flex gap-1 items-center">
                  <Brain className="w-4 h-4 text-purple-600" />
                  AI Recommendations
                </div>
                {recommendations.map((rec, idx) => (
                  <div key={idx}>
                    <div className="font-medium flex gap-1 items-center">
                      <TriangleAlert className="w-4 h-4 text-orange-400" />
                      {rec.title}
                    </div>
                    <div className="text-gray-500 text-xs pl-5">{rec.desc}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Multi-Select Checkboxes */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Select Fields to View:
              </label>
              <div className="flex flex-col gap-2 pt-2">
                <div className="space-y-2 flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    {options.map((option) => {
                      const isChecked = selectedFields.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className={`cursor-pointer px-4 py-1 rounded-md border text-sm font-medium transition 
                              ${isChecked
                              ? "bg-purple-200 text-purple-500  shadow"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFieldChange(option.value)}
                            className="hidden"
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Render selected components in the order selected */}
            <div className="mt-2 space-y-2">
              {selectedFields.map((field) => renderSelectedComponent(field))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricCard;
