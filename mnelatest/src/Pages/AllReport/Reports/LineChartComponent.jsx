import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush 
} from 'recharts';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';

// import { data } from './data';

const color = ["#8884d8", "#82ca9d", "orange", "pink"]
export default function LineChartComponent({reportId}) {
  const [report ,setReport]=useState([])
  const token=LocalStorage("token")
  // const {reportId}=useParams()
  const newarr=[]
  const [keysArr ,setKeysArr]=useState
  const [data,setData]=useState([])([])
  const [loading,setLoading]=useState(false)

  
const getReportsData=async()=>{
  setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
  
      setReport(response)
     
      
      for (var item in response){
        newarr.push(response[item])
        
        
      }
      console.log("new arry",newarr)
      setData(newarr)
   
  }).then(()=>{
    setLoading(false)
      setKeysArr(Object.keys(newarr[0]).slice(1))
      console.log("linechart keysarr",keysArr)
      
  })
  .catch((error)=>{
      console.log("or",error)
  })
}

useEffect(() => {
  getReportsData()    
}, [])
  return (
    <div>
      {loading&&(
        <div>
          <p>loading ...</p>
        </div>
      )}
      {!loading&&(
            <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            {keysArr.map((item,index) =>  (
                <Line type="monotone" dataKey={item} stroke={color[index]}/>
              )
              )} 
          </LineChart>
      )}
    </div>

  )
}
