import React, { useEffect, useState } from "react";
import { actions } from "./actions";
import ActionItem from "./ActionItem";
import RecommendationCard from "./RecommendationCard";
import { recommendations } from "./recommendations";
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
  const [activePersona, setActivePersona] = useState(department.personas[0]);
  const [showNewActionModal, setShowNewActionModal] = useState(false);
  const departmentActions = actions[departmentId];
  const actionPlans = useActionPlanStore((state) => state.actionPlans);
  const data = actionPlans[selected];

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
  // console.log(actionAI?.data);

  const pendingActions = data?.filter((a) => a.status === "pending");
  const inProgressActions = data?.filter((a) => a.status === "in-progress");
  const completedActions = data?.filter((a) => a.status === "completed");

  useEffect(() => {
    setActivePersona(selected);
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
            </div>
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
            <div className="flex items-center bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm cursor-pointer">
              <span className="font-medium">All Actions</span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm cursor-pointer">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>Pending</span>
              <span className="ml-1.5 bg-slate-200 text-slate-800 h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {pendingActions?.length}
              </span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm cursor-pointer">
              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
              <span>In Progress</span>
              <span className="ml-1.5 bg-blue-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {inProgressActions?.length}
              </span>
            </div>
            <div className="flex items-center bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-sm cursor-pointer">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Completed</span>
              <span className="ml-1.5 bg-green-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
                {completedActions?.length}
              </span>
            </div>
          </div>

          <button className="flex items-center text-slate-600 hover:text-slate-800">
            <Filter className="h-4 w-4 mr-1.5" />
            <span className="text-sm">Filter</span>
          </button> */}
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
            <div className="border-b p-4 flex items-center gap-2 font-semibold text-gray-800">
              <TrendingUp color="#F59E0B" size={20} />
              AI Recommendations
            </div>
            {actionAI.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonRecommendationCard key={i} />
              ))}
            {departmentRecommendations?.map((recommendation, index) => (
              <div key={index}>
                <RecommendationCard key={index} data={recommendation} />
              </div>
            ))}
          </div>
        </div>

        {showNewActionModal && (
          <CreateActionCard setShowNewActionModal={setShowNewActionModal} />
        )}
      </div>
    </div>
  );
};

export default ActionPlan;
