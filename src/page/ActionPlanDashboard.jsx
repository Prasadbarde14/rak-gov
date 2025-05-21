import React from 'react'
import { useOutletContext } from "react-router-dom";
import ActionPlan from '../components/ActionPlan/ActionPlan';
import { departments } from '../API/APICalls/department';


const ActionPlanDashboard = () => {
  const [selected]=useOutletContext();
  return (
    <div className='p-3 flex flex-col flex-1 gap-5 h-full overflow-y-auto scroll-smooth scrollbar-custom'>
      <ActionPlan selected={selected} department={departments[0]}/>

    </div>
  )
}

export default ActionPlanDashboard