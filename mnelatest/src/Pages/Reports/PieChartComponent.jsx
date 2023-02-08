
import React, {  useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { LocalStorage } from "../../Utils/Hooks/useLocalStorage";
import { requests } from "../../Utils/Services/Api";


const COLORS = ["#0088FE", "red","#00C49F", "#FFBB28", "#FF8042","purple","pink"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const token=LocalStorage("token")
 const [loading,setLoading]=useState(false)
  const [keysArr,setKeysArr]=useState([])
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
      console.log("piechartdata",response)
      for (var item in response){
        newarr.push(response[item])
      
      }
      
      setData(newarr)
    }).then(()=>{
      setLoading(false)
      console.log("newarr ",data)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("keysarrtyy",keysArr)
  }).catch((error)=>{
      console.log("or",error)
  })
}
const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
console.log("data2",data2)
useEffect(() => {
  getReportsData()    
}, [])
  return (
    <PieChart width={400} height={400}>
      {keysArr.map((arr,index)=>(
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey={arr}
      >
      
     
        {keysArr.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      ))}
    </PieChart>
  );
}
