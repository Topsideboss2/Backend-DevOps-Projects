import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { requests } from '../../services/Api'
import { getToken } from '../../services/useToken'


const data=[
    {"name":"rainfall","type":"BarGraph","operation":"sum"}  ,  
    {"name":"sunshile","type":"scatter","operation":"max"}
]

function ReportTable() {
    const [reports ,setReports]=useState([])
    const [loading,setLoading]=useState(false)
    const token=getToken()
const fetchReports = async () => {
        
    try {
        setLoading(true)
        const response = await requests.get('company/reports', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setLoading(false);   
       

        console.log('reports tableresponse', response)
        setReports(response.data)
    } catch (error) {
        
        setLoading(false);
        console.log('error',error)
       
    }
    
}
useEffect(() => {

    fetchReports()
},[])
         
  return (
    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Profile Datatable</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="example3" class="display" style={{minWidth: "845px"}}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Report Name</th>
                                                <th>Report Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((d,index)=>(
                                                <tr key={index}>
                                                    <td></td>
                                                   <td>{d.name}</td>
                                                   <td>
                                                        <h6>
                                                            {`${d.report_type_name=== `LineChart`?`LineChart`:`${d.report_type_name===`ComposedChart`?`ComposedChart`:
                                                            `${d.report_type_name===`AreaChart`?`area Chart`:`${d.report_type_name===`BarChart`?`Bar Chart`:
                                                        `${d.report_type_name===`PieChart`?`pie Chart`:`${d.report_type_name===`RadarChart`?`Radar Chart`:
                                                    `${d.report_type_name===`RadialBarChart`?`Radial Bar Chart`:`scatter Chart`}`}`}`}`}`
                                                           }`}`}
                                                        </h6>

                                                   </td>
                                                  
                                                   
                                                   <td>
                                                       <div class="d-flex">
                                                       <Link to={`/reports/${d.id}`}  class="light btn-primary shadow btn-xs sharp"><i class="bi bi-eye-fill"></i></Link>

                                                           <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                                                           <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                                                       </div>												
                                                   </td>												
                                               </tr>
                                            ))}
                                         
                                           
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default ReportTable