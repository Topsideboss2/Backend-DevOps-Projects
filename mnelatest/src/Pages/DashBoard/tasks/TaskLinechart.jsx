import React, { useEffect, useState } from 'react'
import "../../../Assets/styles/styles.css"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';


const day1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const month1 = ['Jan', 'Feb', 'Mar', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const year1 = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

const data1 = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]
function TaskLinechart() {
  const [values, setValues] = useState([])
    const [time, setTime] = useState("daily")
    const token = LocalStorage()
    const [day, setDay] = useState([])
    const [month, setMonth] = useState([])
    const [year, setYear] = useState([])
    const [projectType, setProjectType] = useState([])
    

    const totalProjectsChartData = async(response) => {
      console.log('values', response)
      if(response.length !== 0) {
              await response.day.map((value, index) => {
              const da = {
                  "name" : day1[index],
                  "value": value,
              }
              setDay(oldArray => [...oldArray, da])
              })
              await response.month.map((value, index) => {
              const da = {
                  "name" : month1[index],
                  "value": value,
              }
              setMonth(oldArray => [...oldArray, da])
              })
          
              await response.year.map((value, index) => {
              const da = {
                  "name" : year1[index],
                  "value": value,
              }
              setYear(oldArray => [...oldArray, da])
              })
          
      }
  }
  const fetchData = async () => {
    try {
        const response = await requests.get(`/reports/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setValues(response);
        totalProjectsChartData(response)
        // projectTypes(response)
       
        
    } catch (error) {
       console.log('dashboard-error', error)
    }
    
}

useEffect(() => {
  setValues([])
  setDay([])
  setMonth([])
  setYear([])
  fetchData()

  return () => {
    setValues([])
    setDay([])
    setTime('daily')
    setMonth([])
    setYear([])
  }
}, [])

  return (
    <div class="card-body">
        <div class="current-tab">
            <ul class="nav nav-tabs chh" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="tab" role="tab" onClick={() => setTime("daily")}>Day</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" role="tab" onClick={() => setTime("monthly")}>Month</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab"role="tab" onClick={() => setTime("yearly")}>Year</a>
                </li>
            </ul>
        </div>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="Daily">
    <AreaChart
      width={450} height={250} data={time === 'daily' ? day: time === 'monthly' ? month : time === 'yearly' ? year : data1 }
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
    </div>
    </div>
    </div>
  )
}

export default TaskLinechart