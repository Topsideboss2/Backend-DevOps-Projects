import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";
import { requests } from "../../Utils/Services/Api";
import { LocalStorage } from "../../Utils/Hooks/useLocalStorage";


const color = ["#0088FE", "red","#00C49F", "#FFBB28", "#FF8042","purple","pink"];
function ComposeChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const [loading,setLoading]=useState(false)
  const [keysArr,setKeysArr]=useState([])
  const token=LocalStorage("token")
  const[data,setData]=useState([])
  const newarr=[]
 

const getReportsData=async()=>{
  setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
  
      setReport(response)
      console.log("composed chart",response);
      
      for (var item in response){
        newarr.push(response[item])
      
      }
      
      console.log("newsarr",newarr)
    }).then(()=>{
      setLoading(false)
      setData(newarr)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("keysarrt",keysArr)
  }).catch((error)=>{
      console.log("or",error)
  })
}
useEffect(() => {
  getReportsData()    
}, [])


// const data = [
//   {
//     name: "Page A",
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//     cnt: 490
//   },
//   {
//     name: "Page B",
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//     cnt: 590
//   },
//   {
//     name: "Page C",
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//     cnt: 350
//   },
//   {
//     name: "Page D",
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//     cnt: 480
//   },
//   {
//     name: "Page E",
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//     cnt: 460
//   },
//   {
//     name: "Page F",
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//     cnt: 380
//   }
// ];
  return (
    <ComposedChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {keysArr.map((item,index) =>  (
          <Line type="monotone" dataKey={item} stroke={color[0]}/>
              )
              )} 
               {keysArr.map((item,index) =>  (
          <Bar dataKey={item} barSize={20} fill={color[6]} />
              )
              )} 
               {keysArr.map((item,index) =>  (
          <Area type="monotone" dataKey={item} fill={color[2]} stroke={color[5]} /> 
              )
              )} 
               {keysArr.map((item,index) =>  (
         <Scatter dataKey="count" fill={color[4]} />
              )
              )} 

      {/* <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" /> */}
      {/* <Bar dataKey="count" barSize={20} fill="#413ea0" /> */}
      {/* <Line type="monotone" dataKey="count" stroke="#ff7300" /> */}
      {/* <Scatter dataKey="count" fill="red" /> */}
    </ComposedChart>
  );
}



export default ComposeChartComponent