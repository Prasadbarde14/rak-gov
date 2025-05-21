import { motion } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AIrecommendations from "../components/Dashboard/AIrecommendations/AIrecommendations";
import Performance from "../components/Dashboard/Performance/Performance";
import TopAnalyisis from "../components/Dashboard/TopAnalyisis";

function Dashboard() {
  const [selected]=useOutletContext()

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
    <div className="w-full h-full">

        <motion.div
          className="p-5 flex flex-col gap-5 h-full overflow-y-auto scroll-smooth scrollbar-custom"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="h-auto" variants={fadeInZoom}>
            <TopAnalyisis selected={selected} />
          </motion.div>

          <motion.div
            className="flex justify-between w-full h-auto gap-5"
            variants={staggerContainer}
          >
            {/* <div><Accordian/></div> */}
            <motion.div
              className="w-full h-full rounded-md "
              variants={fadeInZoom}
            >
              {selected == "Director of Infrastructure" && <Performance selected={selected} />}
              {selected == "Planning Analyst" && <Performance selected={selected} />}
              {selected == "Maintenance Head" && <Performance selected={selected} />}
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
  );
}

export default Dashboard;
