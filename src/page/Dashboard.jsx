import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalContainer from "../components/Global/GlobalContainer";
import SideNav from "../components/Dashboard/SideNav";
import TopNav from "../components/Dashboard/TopNav";
import AIrecommendations from "../components/Dashboard/AIrecommendations";
import Performance from "../components/Dashboard/Performance";
import TopAnalyisis from "../components/Dashboard/TopAnalyisis";
import { Plus, MenuSquare } from "lucide-react";

function Dashboard() {
  const [sideNavVisibility, setSideNavVisibility] = useState(false);
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
          <TopNav />
        </div>
        <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
          <div className=" h-96 ">
            <TopAnalyisis />
          </div>

          <div className=" flex  justify-between w-full h-auto gap-5">
            <div className="w-full bg-white h-full rounded-md">
              <Performance />
            </div>
            <div className="w-96  bg-white  rounded-md ">
              <AIrecommendations />
            </div>
          </div>
        </div>
      </div>
    </GlobalContainer>
  );
}

export default Dashboard;
