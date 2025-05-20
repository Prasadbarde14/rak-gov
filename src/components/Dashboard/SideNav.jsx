import {
  Factory,
  BadgeCheck,
  Calculator,
  Book,
  LayoutDashboard,
  Truck,
  ChevronRight,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const [selected, setSelected] = useState("0-0");
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();
  if(selected==="5-0")
  {
    navigate("/agents");
  }
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sideNavItems = [
    {
      icon: <Factory color="#1D40AF" size={20} />,
      text: "Ministry of Public Works",
      children: ["Dashboard", "OKR Canvas", "KPI Board", "Action Plan"],
    },
    {
      icon: <Book color="#0D7490" size={20} />,
      text: "RAK Customs Department",
      children: ["Dashboard", "OKR Canvas", "KPI Board", "Action Plan"],
    },
    {
      icon: <Calculator color="#047857" size={20} />,
      text: "Department of Economic Development",
      children: ["Dashboard", "OKR Canvas", "KPI Board", "Action Plan"],
    },
    {
      icon: <BadgeCheck color="#7C3AED" size={20} />,
      text: "Public Services Department",
      children: ["Dashboard", "OKR Canvas", "KPI Board", "Action Plan"],
    },
    {
      icon: <Truck color="#B91C1B" size={20} />,
      text: "RAK Transport Authority",
      children: ["Dashboard", "OKR Canvas", "KPI Board", "Action Plan"],
    },
    {
      icon: <Settings2 color="#94A3B8" size={20} />,
      text: "Settings",
      children: ["Agent Interaction"]
    }

  ];

  return (
    <div className="w-64 h-full bg-background-dark ">
      <div className="flex flex-row items-center pl-4 pt-4 gap-2">
        <LayoutDashboard color="#5FA5F9" absoluteStrokeWidth size={30} />
        <h1 className="text-white font-semibold text-xl">GovPerform</h1>
      </div>
      <p className="text-gray-400 text-xs pl-4 pt-2 pb-5">
        Performance Management Platform
      </p>
      <hr className="border-gray-700 mb-5" />
      <div className="flex flex-col ">
        
        {sideNavItems.map((item, index) => (
          <div key={index}>
            {item.text === "Settings" && <hr className="my-4 border-gray-700"/>}
            <SideNavItem
              icon={item.icon}
              text={item.text}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
            {openIndex === index && (
              <div className="pl-9 pr-5 flex flex-col bg-black">
                {item.children.map((child, idx) => (
                  <div
                    key={idx}
                    className={`py-2 px-4 text-gray-400 hover:text-white cursor-pointer text-sm  rounded-md ${selected === `${index}-${idx}` ? "bg-[#1F3A8A] text-white":"hover:bg-[#1E293B]"}`}
                    onClick={() =>{
                       setSelected(`${index}-${idx}`)
                    }
                    }
                  >
                    {child}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SideNavItem({ icon, text, isOpen, onClick }) {
  return (
    <div
      className={`flex flex-row items-center p-2 m-1 gap-2 hover:bg-gray-800 cursor-pointer justify-between ${
        isOpen ? "bg-gray-800" : ""
      }`}
      onClick={onClick}
    >
      <div className={`flex flex-row gap-2 ${text==="Settings"?"pl-5":""}`}>
        {icon}
        <p className={`${text==="Settings"?"text-gray-400 ":"text-white"} text-sm font-medium`}>{text}</p>
      </div>
      <ChevronRight
        color="#94A3B8"
        size={15}
        className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
      />
    </div>
  );
}

export default SideNav;
