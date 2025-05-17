import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../component/Dashboard/SideNav";
import TopNav from "../component/Dashboard/TopNav";
import GlobalContainer from "../component/Global/GlobalContainer";
import AIrecommendations from "../component/Dashboard/AIrecommendations";
import Performance  from '../component/Dashboard/Performance'
import TopAnalyisis from "../component/Dashboard/TopAnalyisis";


function Dashboard() {

  return (
    <GlobalContainer>
      <SideNav />

      <div className="flex flex-col w-full h-full ">
        <TopNav />

        <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto">
          <div className="bg-gray-100 h-96 "><TopAnalyisis/></div>

          <div className=" flex  justify-between w-full h-auto gap-5">
            <div className="w-full bg-white h-full rounded-md">
            <Performance/>
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
