import React,{useEffect} from 'react'
import {useParams} from "react-router-dom"  
import { useDispatch, useSelector } from 'react-redux';
import GetCombineReportAction from '../../Redux/Actions/Reports/GetCombineReport';
import BarChartComponent from './BarChart';
import LineChartComponent from './LineChart';
import PieChartComponent from './PieChartComponent';
import RadarChartComponentss from './RadarComponent';
import ComposeChartComponent from './ComposeChartComponent';
import AreaChartComponent from './AreaChart';

function CombineChart() {
    const dispatch=useDispatch()
  const report=useSelector(state=>state.combineReport.data)
  const loadig=useSelector(state=>state.combineReport.loading)
  const {reportId}=useParams()


  const getCombineReportsData=async()=>{
dispatch(GetCombineReportAction(reportId))
    
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