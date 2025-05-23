import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { Plus, MenuSquare } from "lucide-react";

function Dashboard() {
  const [sideNavVisibility, setSideNavVisibility] = useState(false);
  const [selected, setSelected] = React.useState("Director of Infrastructure");

  // Animation variants
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
         className={`w-64 top-0 h-full ${
          !sideNavVisibility ? "hidden" : "fixed"
        } lg:sticky lg:block z-90`}
        initial="hidden"
        animate="visible"
        variants={slideInLeft}
      >
        <SideNav />
      </motion.div>
      <div className="flex flex-col w-full h-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInZoom}
          className="w-full"
        >
          <TopNav selected={selected} setSelected={setSelected} />
        </motion.div>

        
          <motion.div 
            className="p-5 flex flex-col gap-5 h-full overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="h-96 " variants={fadeInZoom}>
              <TopAnalyisis selected={selected} />
            </motion.div>

            <motion.div 
              className="flex justify-between w-full h-auto gap-5"
              variants={staggerContainer}
            >
              <motion.div 
                className="w-full bg-white h-full rounded-md p-5"
                variants={fadeInZoom}
              >
                <Performance />
                {selected == "Planning Analyst" && <ProjectPlanningOverview/>}
                {selected == "Maintenance Head" && <MaintenanceOverview/>}
                {selected == "Maintenance Head" && <MaintenanceMetric/>}
              </motion.div>
              <motion.div 
                className="w-96 bg-white rounded-md"
                variants={fadeInZoom}
              >
                <AIrecommendations selected={selected} />

              </motion.div>
            </motion.div>
          </motion.div>
        
      </div>
      <div className="relative">
        <AIAssistantWidget />
      </div>
    </GlobalContainer>
  );
}

export default Dashboard;
