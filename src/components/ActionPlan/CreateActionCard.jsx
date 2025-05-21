import React from "react";

const CreateActionCard = ({setShowNewActionModal}) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h3 className="text-lg font-medium text-slate-900 mb-4">
          Create New Action
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter action title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              rows={3}
              placeholder="Enter action description"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setShowNewActionModal(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
