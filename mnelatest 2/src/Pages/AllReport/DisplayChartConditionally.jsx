import React ,{useState}from 'react'
import { Area } from 'recharts'
import AreaChartComponent from '../../components/Reports/AreaChart'
import BarChartComponent from '../../components/Reports/BarChartComponent'
import ComposeChartComponent from '../../components/Reports/ComposeChartComponent'
import LineChartComponent from '../../components/Reports/LineChartComponent'
import RadialChartComponent from '../../components/Reports/RadialChartComponent'
import ScatterChartComponent from '../../components/Reports/ScatterChartComponent'

export default function DisplayChartConditionally() {
    const data=[
        {"name":"area","id":2},
        // {"name":"line","id":2},
        // {"name":"scatter","id":3},
        // {"name":"compose","id":4},
        // {"name":"radial","id":5},
        // {"name":"bar","id":6}
    ]
  return (
    <div>
        {data.map((d,index)=>(
            <div key={index}>
                {
                    d.id===1?
                    <AreaChartComponent/>
                    :d.id===2?
                    <ScatterChartComponent/>:
                    d.id===3?
                <ComposeChartComponent/>
                :<RadialChartComponent/>
                }
             </div>   
        ))}
    </div>
  )
}
