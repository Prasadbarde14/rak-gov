import React, { useEffect, useState } from "react";
import ActionItem from "./ActionItem";
import RecommendationCard from "./RecommendationCard";

import {
  ClipboardList,
  PlusCircle,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import Breadcrumbs from "../OKRCanvas/Breadcrumbs";
import CreateActionCard from "./CreateActionCard";
import { usePostAIActionPlan } from "../../API/Query/query";
import SkeletonRecommendationCard from "../Dashboard/AIrecommendations/SkeletonRecommendationCard";
import { useActionPlanStore } from "../../store/actionPlanStore";

const ActionPlan = ({
  department,
  departmentId = "public-works",
  selected,
}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [activePersona, setActivePersona] = useState(department.personas[0]);
  const [showNewActionModal, setShowNewActionModal] = useState(false);

  const { getPlansByRoleAndStatus } = useActionPlanStore();
  const data = getPlansByRoleAndStatus(selected, activeStatus);


  const handleOnClickStatus = (status) => {
    setActiveStatus(status);
  };
  const handleNewAction = () => {
    setShowNewActionModal(true);
  };

  const actionAI = usePostAIActionPlan(
    "give me ai recommendation for ",
    selected,
    true,
    data
  );

  const departmentRecommendations = actionAI?.data;

  const pendingActions = data?.filter((a) => a.status === "pending");
  const inProgressActions = data?.filter((a) => a.status === "in-progress");
  const completedActions = data?.filter((a) => a.status === "completed");
  useEffect(() => {
    setActivePersona(selected);
    setActiveStatus("");
  }, [selected]);

  return (
    <div className="h-full p-2">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "Departments", href: "/" },
            { label: department.name, href: `/` },
            { label: "Action Plan" },
          ]}
        />
      </div>

      <div className="mb-6 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-medium text-slate-800">Action Plan</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNewAction}
              className="flex items-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Action
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div
              onClick={() => handleOnClickStatus("")}
              className={`flex items-center rounded-full px-3 py-1 text-sm cursor-pointer 
        ${
          activeStatus === ""
            ? "bg-indigo-50 text-indigo-700"
            : "bg-slate-100 text-slate-600"
        }`}
            >
              <span className="font-medium">All Actions</span>
            </div>
            <div
              onClick={() => handleOnClickStatus("pending")}
              className={`flex items-center rounded-full px-3 py-1 text-sm cursor-pointer 
        ${
          activeStatus === "pending"
            ? "bg-indigo-50 text-indigo-700"
            : "bg-slate-100 text-slate-600"
        }`}
            >
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>Pending</span>
              <span className="ml-1.5 bg-slate-200 text-slate-800 h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {pendingActions?.length}
              </span>
            </div>
            <div
              onClick={() => handleOnClickStatus("in-progress")}
              className={`flex items-center rounded-full px-3 py-1 text-sm cursor-pointer 
        ${
          activeStatus === "in-progress"
            ? "bg-indigo-50 text-indigo-700"
            : "bg-slate-100 text-slate-600"
        }`}
            >
              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
              <span>In Progress</span>
              <span className="ml-1.5 bg-blue-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {inProgressActions?.length}
              </span>
            </div>
            <div
              onClick={() => handleOnClickStatus("completed")}
              className={`flex items-center rounded-full px-3 py-1 text-sm cursor-pointer 
        ${
          activeStatus === "completed"
            ? "bg-indigo-50 text-indigo-700"
            : "bg-slate-100 text-slate-600"
        }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Completed</span>
              <span className="ml-1.5 bg-green-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {completedActions?.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">In Progress</h3>
            {inProgressActions?.map((action) => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-slate-800 mb-4">Pending</h3>
            {pendingActions?.map((action) => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>

          <div>
            <h3 className="font-medium text-slate-800 mb-4">Completed</h3>
            {completedActions?.map((action) => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
        </div>

        <div>
          <div className=" p-2 lg:p-4 flex items-center gap-2 font-semibold text-gray-800">
            <TrendingUp color="#F59E0B" size={20} />
            AI Recommendations
          </div>
          {actionAI.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRecommendationCard key={i} />
            ))}
          {departmentRecommendations?.map((recommendation, index) => (
            <div key={index} className="space-y-4 p-1 lg:p-2">
              <RecommendationCard
                key={index}
                data={recommendation}
                selected={selected}
              />
            </div>
          ))}
        </div>
      </div>

      {showNewActionModal && (
        <CreateActionCard setShowNewActionModal={setShowNewActionModal} selected={selected}/>
      )}
    </div>
  );
};

export default ActionPlan;
