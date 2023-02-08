import React ,{useState}from 'react'
import BarChartComponent from '../../components/Reports/BarChartComponent'
import ComposeChartComponent from '../../components/Reports/ComposeChartComponent'
import LineChartComponent from '../../components/Reports/LineChartComponent'
import RadialChartComponent from '../../components/Reports/RadialChartComponent'
import ScatterChartComponent from '../../components/Reports/ScatterChartComponent'


function ReportDisplay() {
    const [state,setState] = useState({
        type: "Line"
      })
    
     const handleChange = (e) => {
        setState({type: e.target.value})
      }
    
      const fetchChart = (props) => {
        const {type} = state
        switch(type){
          case "Line": return <LineChartComponent key={type}/>
          case "Bar": return <BarChartComponent key={type}/>
          case "Stacked": return <BarChartComponent stacked key={type}/>
          case "compose": return <ComposeChartComponent stacked key={type}/>
          case "radial": return <RadialChartComponent stacked key={type}/>
          case "scatter": return <ScatterChartComponent stacked key={type}/>
          default: return <LineChartComponent/>
        }
      }
    
  return (
    <div>
    <select onChange={handleChange}>
      <option>Line</option>
      <option>Bar</option>
      <option>Stacked</option>
      <option>compose</option>
      <option>radial</option>
      <option>scatter</option>
    </select>
  {fetchChart()}
  </div>
  )
}

export default ReportDisplay