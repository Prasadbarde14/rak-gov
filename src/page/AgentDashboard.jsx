import React from 'react'
import { useOutletContext } from "react-router-dom";
import AgentPerformance from '../components/AgentManagement/AgentPerformance'
import AgentOverview from '../components/AgentManagement/AgentOverview';
import PiBobAgent from '../components/AgentManagement/PiBobAgent';
import AgentInteractionSection from '../components/AgentManagement/AgentInteractionSection';

const AgentDashboard = () => {
  const [selected]=useOutletContext();
  return (
    <div className='p-3 flex flex-col flex-1 gap-5 h-full overflow-y-auto scroll-smooth scrollbar-custom'>
      {selected == "Performance" && <AgentPerformance />}
      {selected == "Agent Overview" && <AgentOverview />}
      {selected == "Interaction" && <AgentInteractionSection />}
      {selected== "PI-BOB Agent" && <PiBobAgent/>}

    </div>
  )
}

export default AgentDashboard