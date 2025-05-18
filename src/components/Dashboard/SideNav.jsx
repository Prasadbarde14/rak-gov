import React from "react";
import { LayoutDashboard } from "lucide-react";

function SideNav() {
  return (
    <div className="w-64 h-full bg-background-dark fixed hidden md:block">
      <div className="flex flex-row items-center pl-4 pt-4 gap-2">
        <LayoutDashboard color="#5FA5F9" absoluteStrokeWidth size={30} />
        <h1 className="text-white font-semibold text-xl">GovPerform</h1>
      </div>
      <p className="text-gray-400 text-xs pl-4 pt-2 pb-5">
        Performance Management Platform
      </p>
      <hr className="border-gray-700" />
    </div>
  );
}

export default SideNav;
