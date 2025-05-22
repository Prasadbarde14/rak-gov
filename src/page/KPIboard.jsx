import React from 'react'
import KPImonitoringBoard from '../components/KPIBoard/KPImonitoringBoard'
import CrossDepartmentAnalysis from '../components/KPIBoard/CrossDepartmentAnalysis'
import Breadcrumbs from '../components/OKRCanvas/Breadcrumbs'

function KPIboard() {
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
      <KPImonitoringBoard/>
      <CrossDepartmentAnalysis/>
    </div>
  )
}

export default KPIboard