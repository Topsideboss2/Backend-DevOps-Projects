import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush 
} from 'recharts';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';

// import { data } from './data';


const color = ["#8884d8", "#82ca9d", "orange", "pink"]

export default function BarChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const token=LocalStorage("token")
  const [loading,setLoading]=useState(false)
  const newarr=[]
  const lineArr=[]
  const [data,setData]=useState([])
  const [keysArr,setKeysArr]=useState([])
  const [yax,setYax]=useState([])


  
const getReportsData=async()=>{
setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
  setLoading(false)
      setReport(response)
       console.log("barChart fffDataff",report)
      for (var item in response){
        newarr.push(response[item])
      
      }
    }).then(()=>{
      setLoading(false)
      
      console.log("newarr",newarr)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("keysarrtyu",keysArr)
 
  }).catch((error)=>{
    setLoading(false)
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
    <div>
      <h1>fetching data</h1>
    </div>
  )}
  {!loading &&(
      <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      
      {keysArr.map((item,index) =>  (
        <Bar dataKey={item} fill="#82ca9d" />
      )
      )} 
    </BarChart> 
  )}

</div>
    

  )
}
