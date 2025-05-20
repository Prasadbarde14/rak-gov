import React, { useState } from "react";
import {
  Brain,
  TriangleAlert,
  CheckSquare,
  Square,
  ChevronRight,
  Filter,
} from "lucide-react"; // or your icon library
import ProjectPlanningOverview from "../ProjectPlanningOverview.jsx/ProjectPlanningOverview";
import MaintenanceOverview from "./MaintenanceOverview";
import MaintenanceMetric from "./MaintenanceMetrics";
import { motion, AnimatePresence } from "framer-motion";

const MetricCard = ({ data, index, selected }) => {
  const { title, current, predicted, delta, recommendations, impactAnalysis } =
    data?.performanceMetrics || {};

  const [selectedFields, setSelectedFields] = useState([]);

  const options = [
    { label: "Project Planning", value: "project" },
    { label: "Maintenance Overview", value: "maintenanceOverview" },
    { label: "Maintenance Metric", value: "maintenanceMetric" },
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
          <ProjectPlanningOverview
            key="project"
            index={index}
            selected={selected}
            parentData={data}
          />
        );
      case "maintenanceOverview":
        return (
          <MaintenanceOverview
            key="maintenanceOverview"
            index={index}
            selected={selected}
            parentData={data}
          />
        );
      case "maintenanceMetric":
        return (
          <MaintenanceMetric
            key="maintenanceMetric"
            index={index}
            selected={selected}
            parentData={data}
          />
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
            <div className="space-y-1">
              <label className="text-sm font-semibold">
                Select Fields to View:
              </label>
              <div className="flex flex-col gap-1">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(option.value)}
                      onChange={() => handleFieldChange(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
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
