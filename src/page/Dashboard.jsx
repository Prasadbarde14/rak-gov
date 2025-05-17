import React from "react";
import { Outlet } from "react-router-dom";
import GlobalContainer from "../components/Global/GlobalContainer";
import SideNav from "../components/Dashboard/SideNav";
import TopNav from "../components/Dashboard/TopNav";
import AIrecommendations from "../components/Dashboard/AIrecommendations";
import Performance from "../components/Dashboard/Performance/Performance";
import TopAnalyisis from "../components/Dashboard/TopAnalyisis";
import AIAssistantWidget from "../components/AIAssistantWidget/AIAssistantWidget";
import MaintenanceOverview from "../components/Dashboard/Performance/MaintenanceOverview";

function Dashboard() {
  return (
    <GlobalContainer>
      <div className="flex h-screen overflow-hidden"> {/* Flex row container */}
        
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNav />

          <div className="p-3 flex flex-col gap-5 h-full overflow-y-auto">
            <div className="h-96">
              <TopAnalyisis />
            </div>

            <div className="flex justify-between w-full h-auto gap-5">
              {/* Left: Performance Panels */}
              <div className="w-full flex flex-col gap-4">
                <Performance />
                <MaintenanceOverview />
                <MaintenanceMetrics />
              </div>

              {/* Right: AI Recommendations */}
              <div className="w-96 bg-white rounded-md">
                <AIrecommendations />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Widget - place outside of flex or inside absolute */}
      <div className="relative">
        <AIAssistantWidget />
      </div>
    </GlobalContainer>
  );
}


export default Dashboard;
