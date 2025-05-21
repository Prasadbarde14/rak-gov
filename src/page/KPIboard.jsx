import React from 'react'
import KPImonitoringBoard from '../components/KPIBoard/KPImonitoringBoard'
import CrossDepartmentAnalysis from '../components/KPIBoard/CrossDepartmentAnalysis'

function KPIboard() {
  return (
    <div>
      <KPImonitoringBoard/>
      <CrossDepartmentAnalysis/>
    </div>
  )
}

export default KPIboard