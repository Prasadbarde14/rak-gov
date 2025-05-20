import { motion } from "framer-motion";
import { MenuSquare, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AIAssistantWidget from "../components/AIAssistantWidget/AIAssistantWidget";
import SideNav from "../components/Dashboard/SideNav";
import TopNav from "../components/Dashboard/TopNav";
import GlobalContainer from "../components/Global/GlobalContainer";

function GlobalPage() {
  const [sideNavVisibility, setSideNavVisibility] = useState(false);
  const [tabs, setTabs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTabs(["Director of Infrastructure", "Planning Analyst", "Maintenance Head"]);
      setSelected("Director of Infrastructure");
    } else if (location.pathname === "/agent") {
      setTabs(["Agent Overview", "PI-BOB Agent", "Performance", "Interaction"]);
      setSelected("Agent Overview");
    }
  }, [location]);

  const [selected, setSelected] = useState("Director of Infrastructure");

  const fadeInZoom = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

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

      <motion.div
        className={`w-64 top-0 h-full ${!sideNavVisibility ? "hidden" : "fixed"
          } lg:sticky lg:block z-90`}
        initial="hidden"
        animate="visible"
        variants={slideInLeft}
      >
        <SideNav />
      </motion.div>

      <div className="flex flex-col w-full h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInZoom}
          className="w-full"
        >
          <TopNav selected={selected} setSelected={setSelected} tabs={tabs} />
        </motion.div>

        <div className="w-full flex-1 min-h-0 overflow-auto">
          <Outlet context={[selected, setSelected, tabs]} />
        </div>
      </div>

      <div className="relative">
        <AIAssistantWidget />
      </div>
    </GlobalContainer>
  );
}

export default GlobalPage;
