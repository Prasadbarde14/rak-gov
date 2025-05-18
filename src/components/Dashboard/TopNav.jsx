import React from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { Bell, Search, Settings2, Users } from "lucide-react";
function TopNav({selected,setSelected}) {
  const handleSelect = (value) => {
    setSelected(value);
  };
  const selectOptions = [
    "Director of Infrastructure",
    "Planning Analyst",
    "Maintenance Head",
  ];
  return (
    <div className="bg-background-white w-full  shadow-xs shadow-gray-300 ">
      <div className="flex flex-row xl:flex-nowrap flex-wrap items-center justify-between">
        <div>
          <h2 className="text-[19px] font-bold px-7 pt-3">
            Ministry of Public Works
          </h2>
          <p className="text-gray-500 text-sm px-7 pt-2 pb-5">
            Dashboard • Smart Infrastructure & Sustainability
          </p>
        </div>
        <div className="flex flex-row gap-6 items-center justify-around flex-wrap xl:justify-around xl:p-2 p-4">
          <div className="flex border-1 border-slate-200 bg-slate-100 p-2 items-center rounded-md">
            <Search size={16} color="#7D8082" />
            <Input
              placeholder={"Search..."}
              type={"text"}
              className={" pl-2 rounded-md text-sm outline:none"}
            />
          </div>
          <div className="flex">
            <Users size={18} color="#6b7280" />
            <Select
              options={selectOptions}
              className={"text-sm px-4"}
              selected={selected}
              handleSelect={handleSelect}
            />
          </div>
          <Settings2 size={20} color="#475569" />
          <div className="relative hover:bg-gray-200 rounded-full p-2">
            <div className="px-1 items-center justify-center rounded-2xl bg-red-500 absolute top-0 right-0 text-xs text-white">
              <p>3</p>
            </div>
            <Bell size={18} />
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="bg-blue-600 px-3 py-1 text-white mr-2 rounded-full">
              A
            </p>
            <Select options={["Admin"]} className={"text-sm"} />
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="flex flex-row items-center gap-4 cursor-pointer">
        {selectOptions.map((option, index) => (
          <div key={index}>
            <p
              className={`text-sm  ${
                selected == option
                  ? "border-blue-500 border-b-2 text-blue-500"
                  : " "
              } p-2`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopNav;
