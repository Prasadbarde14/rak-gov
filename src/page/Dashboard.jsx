import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalContainer from "../components/Global/GlobalContainer";
import SideNav from "../components/Dashboard/SideNav";
import TopNav from "../components/Dashboard/TopNav";
import AIrecommendations from "../components/Dashboard/AIrecommendations/AIrecommendations";
import Performance from "../components/Dashboard/Performance/Performance";
import TopAnalyisis from "../components/Dashboard/TopAnalyisis";
import ProjectPlanningOverview from "../components/Dashboard/ProjectPlanningOverview.jsx/ProjectPlanningOverview";
import MaintenanceOverview from "../components/Dashboard/Performance/MaintenanceOverview";
import AIAssistantWidget from "../components/AIAssistantWidget/AIAssistantWidget";
import MaintenanceMetric from "../components/Dashboard/Performance/MaintenanceMetrics";
// import AIrecommendations from "../components/Dashboard/AIrecommendations";
// import Performance from "../components/Dashboard/Performance";
// import TopAnalyisis from "../components/Dashboard/TopAnalyisis";
import { Plus, MenuSquare } from "lucide-react";

function Dashboard() {
  const [sideNavVisibility, setSideNavVisibility] = useState(false);
  const [selected, setSelected] = React.useState("Director of Infrastructure");
  return (
    <GlobalContainer>
      <div
        className="lg:hidden top-5 right-5 rounded-xl fixed bg-black z-99 p-2"
        onClick={() => setSideNavVisibility(!sideNavVisibility)}
      >
        {!sideNavVisibility ? (
          <MenuSquare color="#ffffff" />
        ) : (
          <Plus color="#ffffff" className="rotate-45" />
        )}
      </div>
      <div
        className={`w-64 top-0 h-full ${
          !sideNavVisibility ? "hidden" : "fixed"
        } lg:sticky lg:block z-90`}
      >
        <SideNav />
      </div>
      
      <div className="flex flex-col w-full h-full ">
        <div className="w-full">
          <TopNav setSelected={setSelected} selected={selected}/>
        </div>
        {selected == "Director of Infrastructure" && <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
          <div className=" h-96 ">
            <TopAnalyisis />
          </div>
{/* =======


function Dashboard() {
  
  return (
    <GlobalContainer>
      <div className="w-64 flex-shrink-0">
        <SideNav />
      </div>
      <div className="flex flex-col w-full h-full ">
        <div>
          <TopNav selected={selected} setSelected={setSelected}/>
        </div>
        {selected == "Director of Infrastructure" && (
          <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
            <div className=" h-96 ">
              <TopAnalyisis selected={selected} />
            </div>
>>>>>>> ff4516160d6fcc9d2d1f71a9a4babf6b9d6fc759 */}

            <div className=" flex  justify-between w-full h-auto gap-5">
              <div className="w-full bg-white h-full rounded-md">
                <Performance />
              </div>
              <div className="w-96  bg-white  rounded-md ">
                <AIrecommendations selected={selected} />
              </div>
            </div>
          </div>}
      

        {selected == "Planning Analyst" && (
          <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
            <div className=" h-96 ">
              <TopAnalyisis selected={selected} />
            </div>

            <div className=" flex  justify-between w-full h-auto gap-5">
              <div className="w-full bg-white h-full rounded-md">
              <Performance />
              <ProjectPlanningOverview />
              </div>
              <div className="w-96  bg-white  rounded-md ">
                <AIrecommendations selected={selected} />
              </div>
            </div>
          </div>
        )}

        {selected == "Maintenance Head" && (
          <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
            <div className=" h-96 ">
              <TopAnalyisis selected={selected} />
            </div>

            <div className=" flex  justify-between w-full h-auto gap-5">
              {/* Left: Performance Panels */}
              <div className="w-full flex flex-col gap-4">
                <Performance />
                <MaintenanceOverview />
                <MaintenanceMetric />
              </div>
              <div className="w-96  bg-white  rounded-md ">
                <AIrecommendations selected={selected} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <AIAssistantWidget />
      </div>
    </GlobalContainer>
  );
}

export default Dashboard;
