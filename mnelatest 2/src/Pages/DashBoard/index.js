import React from 'react'
import Ongoing from './ongoingprojects'
import Column1 from './projects'
import Column2 from './tasks'
import TaskLineChartComponent from './tasks/TaskLinechart'

export default function Dashboard() {
  return (
    <>
      <div class="row">
        <Column1 />
        {/* <TaskLineChartComponent/> */}
        <Column2 />
        
      </div>
    </>
  )
}
