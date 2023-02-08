import React,{useEffect,useState} from 'react'
import BarChartComponent from './Reports/BarChartComponent'
import LineChartComponent from './Reports/LineChartComponent'
import PieChartComponent from "./Reports/PieChartComponent"
import AreaChartComponent from "./Reports/AreaChart";
import RadialChartComponent from "./Reports/RadialChartComponent";
import ComposeChartComponent from "./Reports/ComposeChartComponent";
import RadarChartComponentss from "./Reports/RadarComponent";
import ScatterChartComponent from "./Reports/ScatterChartComponent";
import {useParams} from "react-router-dom"  
import { requests } from '../../Utils/Services/Api';
import { LocalStorage } from '../../Utils/Hooks/useLocalStorage';

const data={
    "name":"winnie","id":3
}
function CombineChart() {
  const [report ,setReport]=useState([])
  const token=LocalStorage("token")
  const {reportId}=useParams()
  const newarr=[]
  const lineArr=[]
  const [data,setData]=useState([])
  const [keysArr,setKeysArr]=useState([])
  const [yax,setYax]=useState([])

  const getCombineReportsData=async()=>{
    await requests.get(`company-reports/${reportId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response)=>{ 
    
        setReport(response.data)
         console.log("specific report",response.data)

    }).catch((error)=>{
        console.log("report error",error)
    })
  }

  useEffect(() => {
    getCombineReportsData() 
      
  }, [])
  return (
    <div>
        {report.report_type_name===`AreaChart`?
        <AreaChartComponent  reportId={reportId}/>:
        report.report_type_name===`BarChart`?<BarChartComponent reportId={reportId}/>:
        report.report_type_name===`LineChart`?<LineChartComponent reportId={reportId}/>:
        report.report_type_name===`PieChart`?<PieChartComponent reportId={reportId}/>:
        report.report_type_name===`ComposedChart`?<ComposeChartComponent reportId={reportId}/>:
          <RadarChartComponentss reportId={reportId}/>
        
      }
    </div>
  )
}

export default CombineChart