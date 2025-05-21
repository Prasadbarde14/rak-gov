import React from 'react'
import { useOutletContext } from "react-router-dom";
import OKRCanvas from '../components/OKRCanvas/OKRCanvas';


const AgentDashboard = () => {
  const [selected]=useOutletContext();
  return (
    <div className='p-3 flex flex-col flex-1 gap-5 h-full overflow-y-auto scroll-smooth scrollbar-custom'>
     <OKRCanvas/>

    </div>
  )
}

export default AgentDashboard