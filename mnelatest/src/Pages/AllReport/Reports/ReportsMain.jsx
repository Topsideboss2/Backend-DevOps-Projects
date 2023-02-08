import LineChartComponent from "../../components/Reports/LineChartComponent"
import BarChartComponent from "../../components/Reports/BarChartComponent"
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, AreaChart 
  } from 'recharts';
import { useState } from "react";
import AreaChartComponent from "./AreaChart";
import PieChartComponent from "./PieChartComponent";
import ComposeChartComponent from "./ComposeChartComponent";
import ScatterChartComponent from "./ScatterChartComponent";
import RadialChartComponent from "./RadialChartComponent";
import ReportDisplay from "../../Pages/AllReport/ReportDisplay";
import DisplayChartConditionally from "../../Pages/AllReport/DisplayChartConditionally";


const color = ["#8884d8", "#82ca9d", "orange", "pink"]

export default function MainReport(){

  const [state ,setState] = useState({
    type: "Line"
  })

  const handleChange = (e) => {
    setState({type: e.target.value})
  }

  const fetchChart = () => {
    const {type} = state
    switch(type){
      case "Line": return <LineChartComponent key={type}/>
      case "area":return<AreaChartComponent key={type}/>
      case "Bar": return <BarChartComponent key={type}/>
      case "Stacked": return <BarChartComponent stacked key={type}/>
      case "pie": return <PieChartComponent stacked key={type}/>
      case "compose ": return <ComposeChartComponent stacked key={type}/>
      case "scatter": return <ScatterChartComponent stacked key={type}/>
      case "radial": return <RadialChartComponent stacked key={type}/>
      default: return <LineChartComponent />
    }
  }

    return (
      <div>
        <div>
          <h1>conditional test</h1>
          <DisplayChartConditionally/>
        </div>
        <p>below are the rest</p>
        <ReportDisplay/>
        {/* <RadarChartComponentss/> */}
        {/* <RadarChartComponent/> */}
     <LineChartComponent/>
     <BarChartComponent/>
     <AreaChartComponent/>
     <PieChartComponent/>
     <ComposeChartComponent/>
     <ScatterChartComponent/>
     <RadialChartComponent/>
      </div>
    )
  }







