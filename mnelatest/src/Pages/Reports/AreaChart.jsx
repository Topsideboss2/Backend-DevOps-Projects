
import React, { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { LocalStorage } from "../../Utils/Hooks/useLocalStorage";
import { requests } from "../../Utils/Services/Api";


export default function AreaChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const [loading,setLoading]=useState([])
  const token=LocalStorage("token")
  // const {reportId}=useParams()
  const newarr=[]
  const [keysArr,setKeysArr]=useState([])
  const [data,setData]=useState([])

  const color = ["#8884d8", "#82ca9d", "orange", "pink"]
const getReportsData=async()=>{
  setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
   
     console.log("areachart data",response)

      for (var item in response){
        newarr.push(response[item])
      
      }
      setData(newarr)
     console.log("newarr",newarr)
  }).then(()=>{
    setLoading(false)
    
    setKeysArr(Object.keys(newarr[0]).slice(1))
  })
  .catch((error)=>{
      console.log("or",error)
  })
}
console.log("keysArr",keysArr)
useEffect(() => {
  getReportsData()    
}, [])
  return (
    <div>
      { loading &&(
        <div>Loading...</div>
      )}
      {!loading&&(
        <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {keysArr.map((item,index)=>(
           <Area
           type="monotone"
           dataKey={item}
           stackId="1"
           stroke="#8884d8"
           fill={color[index]}
         />
        ))}
        
      </AreaChart>
      )}
      
 
      
    </div>
     );
}