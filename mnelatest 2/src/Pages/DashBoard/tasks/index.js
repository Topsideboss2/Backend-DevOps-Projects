import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, AreaChart } from 'recharts';
import TaskLineChartComponent from './TaskLinechart';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
// import { requests } from '../../../Utils/Services/Api';

  const COLORS = ['#8884d8', '#82ca9d'];

export default function Column2() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [val, setVal] = useState([])
    const [data, setData] = useState([])

    const token = LocalStorage("token");

    const onPieEnter = (index) => {
        setActiveIndex(index)
      };

      const fetchData = async () => {
        try {
            const response = await requests.get(`/reports/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setVal(response);
            setData([
                { name: 'Complete', value: response && response.completed_tasks },
                { name: 'Incomplete', value: response && response.incomplete_tasks },
                
            ])
            
        } catch (error) {
           console.log('dashboard-error', error)
        }
        
    }

    useEffect(() => {
      fetchData()
    
    }, [])
    
  return (
    <div class="col-xl-6">
        <div class="row">
            <div class="col-xl-12">
                <div class="card bg-progradient manage-project">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-12">
                                <h4 class="fs-24 font-w700 text-white">Manage your projects in one touch</h4>
                                <span class="fs-16 text-white d-block">Let Mesaas manage your project automatically with our best system </span>
                            </div>
                            <div class="col-xl-6 col-12 text-end">
                                <Link to='/projects' class="btn  bg-white fs-18 btn-rounded">Try Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header border-0">
                        <h4 class="fs-20 font-w700">Tasks</h4>
                    </div>
                    <div class="card-body p-2">
                        <PieChart width={400} height={250} onMouseEnter={onPieEnter}>
                            <Pie
                            data={data}
                            cx={180}
                            cy={80}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart> 
                        
                    </div>
                    <div class="card-body p-2">
                        <TaskLineChartComponent/>
                    
                        
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-sm-6">
                <div class="card">
                    <div class="card-body d-flex px-4  justify-content-between">
                        <div>
                            <div class="">
                                <h2 class="fs-32 font-w700">{val && val.total_milestones}</h2>
                                <span class="fs-18 font-w500 d-block">Total Company Expense</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-sm-6">
                <div class="card">
                    <div class="card-body d-flex px-4  justify-content-between">
                        <div>
                            <div class="">
                                <h2 class="fs-32 font-w700">{val && val.total_tasks}</h2>
                                <span class="fs-18 font-w500 d-block">Total Tasks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-sm-6">
                <div class="card">
                    <div class="card-body d-flex px-4  justify-content-between">
                        <div>
                            <div class="">
                                <h2 class="fs-32 font-w700">{val && val.total_projects}</h2>
                                <span class="fs-18 font-w500 d-block">Completed Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-sm-6">
                <div class="card">
                    <div class="card-body d-flex px-4  justify-content-between">
                        <div>
                            <div class="">
                                <h2 class="fs-32 font-w700">{val && val.completed_tasks}</h2>
                                <span class="fs-18 font-w500 d-block">Completed Tasks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
