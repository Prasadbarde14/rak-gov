import React from "react";
import { Outlet } from "react-router-dom";
import GlobalContainer from "../components/Global/GlobalContainer";
import SideNav from "../components/Dashboard/SideNav";
import TopNav from "../components/Dashboard/TopNav";
import AIrecommendations from "../components/Dashboard/AIrecommendations";
import Performance from "../components/Dashboard/Performance";import TopAnalyisis from "../components/Dashboard/TopAnalyisis";


function Dashboard() {

    return (
        <GlobalContainer>
            <div className='w-64 mr-12'>
            <SideNav />
            </div>

            <div className='flex flex-col w-full h-full '>
                <div className='mb-35'><TopNav /></div>

        <div className="px-5 pb-5 flex flex-col gap-5 h-full overflow-y-auto">
          <div className="h-96 "><TopAnalyisis/></div>

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
