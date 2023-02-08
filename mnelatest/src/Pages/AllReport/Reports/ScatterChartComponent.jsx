import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Legend } from 'recharts';
import { requests } from '../../../Utils/Services/Api';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';


// const data = [
//   { x: 100, y: 200, z: 200 },
//   { x: 120, y: 100, z: 260 },
//   { x: 170, y: 300, z: 400 },
//   { x: 140, y: 250, z: 280 },
//   { x: 150, y: 400, z: 500 },
//   { x: 110, y: 280, z: 200 },
// ];




export default function ScatterChartComponent() {
  const [report ,setReport]=useState([])
  const token=LocalStorage("token")
  const {reportId}=useParams()
  const newarr=[]
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  
const getReportsData=async()=>{
  setLoading(true)
  await requests.get(`/reports/dynamic/${reportId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
      setLoading(false)
      setReport(response)
       console.log("data dynamic scatter",response) 
      for (var item in report){
        newarr.push(report[item])
      
      }
      console.log("newarr",newarr)
      setData(newarr)
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
            <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" name="stature"  />
            
            <YAxis dataKey="count " name="weight" unit="number" />
            <ZAxis dataKey="count" range={[64, 144]} name="score" unit="km" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Total  count" data={data} fill="#8884d8" />
           
          </ScatterChart>
      )}
    </div>

  )
}
