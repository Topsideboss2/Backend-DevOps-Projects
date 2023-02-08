import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import { LocalStorage } from "../../../Utils/Hooks/useLocalStorage";
import { requests } from "../../../Utils/Services/Api";



const style = {
  top: 0,
  left: 350,
  lineHeight: "24px"
};
const COLORS = ["#0088FE", "red","#00C49F", "#FFBB28", "#FF8042","purple","pink"];
function RadialChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const [keysArr,setKeysArr]=useState([])
  const[loading,setLoading]=useState([])
  const token=LocalStorage("token")
  // const {reportId}=useParams()
  const newarr=[]
  const [data,setData]=useState([])

  
const getReportsData=async()=>{
  setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
  
      setReport(response)
       console.log("data dynamic Radial",report) 
      for (var item in report){
        newarr.push(report[item])
      
      }
      console.log("newarr",newarr)
      setData(newarr)
    }).then(()=>{
      setLoading(false)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("keysarrt",keysArr)
  }).catch((error)=>{
      console.log("or",error)
  })
}
console.log("graph data",data)
useEffect(() => {
  getReportsData()    
}, [])
    return (
    <div>
      {loading &&(
        <div>loading ...</div>
      )}
      {!loading &&(
      <div>
        {keysArr.map((arr,index)=>(
        <RadialBarChart
          width={500}
          height={300}
          cx={150}
          cy={150}
          innerRadius={20}
          outerRadius={140}
          barSize={10}
          data={data}
        >
          
            
         
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise
            dataKey={arr}
            fill={COLORS[index % COLORS.length]} fillOpacity={0.6}
          />
          <Legend
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
        ))}
      </div>
      )}
      
      </div>
      );
}

export default RadialChartComponent