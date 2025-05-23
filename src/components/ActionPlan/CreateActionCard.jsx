import React, { useState } from "react";
import { toast } from "react-toastify";
import { useActionPlanStore } from "../../store/actionPlanStore";
import { v4 as uuid } from "uuid";

const CreateActionCard = ({ setShowNewActionModal, selected}) => {
  const { addActionPlan } = useActionPlanStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const impactData = ['low', 'medium', 'high'];
    const randomIndex = Math.floor(Math.random() * impactData.length);
    const randomImpact = impactData[randomIndex];
    // console.log("Submitted Action Impact:", randomImpact);
    const recommendation = {
      id: `act-pw-${uuid()}`,
      title: formData.title,
      description: formData.description,
      status: "pending",
      assignee: formData.name,
      dueDate: formData.dueDate,
      kpiId: `pw-${uuid()}`,
      impact: randomImpact,
    };
    addActionPlan(selected, recommendation);
    setShowNewActionModal(false);
    toast.success("Plan Added Successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h3 className="text-lg font-medium text-slate-900 mb-4">
          Create New Action
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter action title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              rows={3}
              placeholder="Enter action description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter due date"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={() => setShowNewActionModal(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActionCard;
