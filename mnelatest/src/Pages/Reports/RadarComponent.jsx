
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { LocalStorage } from "../../Utils/Hooks/useLocalStorage";
import { requests } from "../../Utils/Services/Api";

const color = ["#0088FE", "red","#00C49F", "#FFBB28", "#FF8042","purple","pink"];
export default function RadarChartComponentss({reportId}) {
  const [report ,setReport]=useState([])
  const [keysArr,setKeysArr]=useState([])
  const token=LocalStorage("token")
 const [loading,setLoading]=useState(false)
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
       console.log("data dynamic radarr",response) 
      for (var item in response){
        newarr.push(response[item])
      
      }
      console.log("newarr",newarr)
      
  }).then(()=>{
    setLoading(false)
    setData(newarr)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("radar chart keysarr",keysArr)
  })
  .catch((error)=>{
      console.log("or",error)
  })
}
// console.log("graph data",data)
useEffect(() => {
  getReportsData()    
}, [])
  return (
    <div>
      {loading && (
        <div>loading ...</div>
      )
      }
      {!loading && (
             <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      {keysArr.map((item,index) =>  (
         <Radar
         name={item}
         dataKey={item}
         stroke="#8884d8"
         fill={color[index]}
         fillOpacity={0.6}
       />
      ))}
     
    </RadarChart>
      )}
     
      
    </div>
   
  );
}
