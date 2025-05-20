import React from 'react'
import { useOutletContext } from "react-router-dom";
import AgentPerformance from '../components/AgentManagement/AgentPerformance'
import AgentOverview from '../components/AgentManagement/AgentOverview'
import PIAgentCard from '../components/AgentManagement/PIAgentCard';

const AgentDashboard = () => {
  const [selected]=useOutletContext();
  return (
    <div className='p-3 flex flex-col flex-1 gap-5 h-full overflow-y-auto scroll-smooth scrollbar-custom'>
      {selected == "Performance" && <AgentPerformance />}
      {selected === "Agent Overview" && <AgentOverview/>}
      {selected === "PI Agent" && <PIAgentCard/>}
    </div>
  )
}

export default AgentDashboard