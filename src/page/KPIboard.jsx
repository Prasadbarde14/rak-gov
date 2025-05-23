import React from 'react'
import KPImonitoringBoard from '../components/KPIBoard/KPImonitoringBoard'
import CrossDepartmentAnalysis from '../components/KPIBoard/CrossDepartmentAnalysis'
import Breadcrumbs from '../components/OKRCanvas/Breadcrumbs'
import { useOutletContext } from 'react-router-dom'

function KPIboard() {
  const [selected] = useOutletContext();
  return (
    <div>
       <div className="pt-5 px-4">
        <Breadcrumbs
          items={[
            { label: "Departments", href: "/" },
            { label: "Ministry of Public Works", href: `/` },
            { label: "KPI Board" },
          ]}
        />
      </div>
      <KPImonitoringBoard selectedPersona={selected}/>
      <CrossDepartmentAnalysis/>
    </div>
  )
}

export default KPIboard