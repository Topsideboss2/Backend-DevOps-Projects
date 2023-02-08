import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, Tooltip, XAxis, YAxis } from 'recharts'
import "../../../Assets/styles/styles.css"
import { requests } from '../../../Utils/Services/Api'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
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
  

export default function Currentbalance() {
    const [values, setValues] = useState([])
    const [time, setTime] = useState("daily")
    const token = LocalStorage("token")
    const [day, setDay] = useState([])
    const [month, setMonth] = useState([])
    const [year, setYear] = useState([])
    const [projectType, setProjectType] = useState([])

    const projectTypes = async (response) => {
        if(response.length !== 0) {
            const data = [
                {
                    "name": "Completed",
                    "value": response.completed_projects,
                    "fill": "#8884d8"
                },
                {
                    "name": "Active",
                    "value": response.active_projects,
                    "fill": "#83a6ed"
                },
                {
                    "name": "Not Started",
                    "value": response.notstarted_projects,
                    "fill": "#8dd1e1"
                },
                {
                    "name": "On Hold",
                    "value": response.onhold_projects,
                    "fill": "#82ca9d"
                },
                {
                    "name": "cancelled",
                    "value": response.canceled_projects,
                    "fill": "#a4de6c"
                },
            ]
           setProjectType(data);
        }
        
    }

    const totalProjectsChartData = async(response) => {
        
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
            projectTypes(response)
            
            
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
    <div class="col-xl-12">
    <div class="row">
        <div class="col-xl-6 col-sm-12 col-xxl-12">
            <div class="card" id="user-activity">
                <div class="card-header border-0 pb-0 flex-wrap">
                    <div>
                        <span class="mb-3 d-block fs-16">Projects</span>
                        <h4 class="fs-24 font-w700 mb-3">{values.total_projects}</h4>
                        {/* <span><small class="text-success">+2.7%</small>  than last week</span> */}
                    </div>
                    <div class="current-icon">
                    <Link to="/projects"><i class="fas fa-long-arrow-alt-up"></i></Link>
                    </div>
                </div>
                <div class="card-body">
                    <div class="current-tab">
                        <ul class="nav nav-tabs chh" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active " data-bs-toggle="tab" role="tab" onClick={() => setTime("daily")}>Day</a>
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
                        <LineChart width={450} height={250} data={time === 'daily' ? day: time === 'monthly' ? month : time === 'yearly' ? year : data1 }
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                        <div class="mt-4 text-center">
                            <h4 class="fs-20 font-w700">Projects created </h4>
                        {/* <p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem</p> */}
                        </div>
                            
                        </div>	
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-sm-12 col-xxl-12">
            <div class="card">
                <div class="card-body">
                    <RadarChart outerRadius={90} width={450} height={250} data={projectType}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, values && values.length]} />
                        <Radar name="Data" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>
               
                    <div class="mt-4 text-center">
                        <h4 class="fs-20 font-w700">Company Project Progress</h4>
                        {/* <p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem</p> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
