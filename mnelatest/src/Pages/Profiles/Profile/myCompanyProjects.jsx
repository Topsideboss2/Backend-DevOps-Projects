import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../Utils/Services/Api'


function MyCompanyProjects() {
    const [loading,setLoading]=useState(false)
    const [projects,setProjects]=useState([])
    const token=LocalStorage("token")
    

    const getProjectData=async()=>{
        setLoading(true)
        await requests.get("/company/projects",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{ 
           setLoading(false)
            setProjects(response.data)
            console.log("projects profile",response.data)

        }).catch((error)=>{
            console.log("or",error)
        })
    }
    const datap=projects.slice(0,3)
    useEffect(() => {
        getProjectData()
    }, [])
    
  return (
    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-interest">
                                    <h5 class="text-primary d-inline">My Company projects</h5>
                                    <div class="row mt-4 sp4 d-flex flex-row" id="lightgallery col-xl-4" >

												
                                        {datap.map((project,index)=>(
                                           
                                          <ul key={index}>

                                              <li class="m-1 font-weight-bold">{index+1 }.<span class="text-capitalize"> {project.title}</span></li> 
                                               
                                        </ul>
                                            ))}
                                            {datap===0 && <div class="text-center">No Projects</div>}
                                            {datap !==0 &&(
                                                 <Link to="/projects"><button class=" btn d-flex justify-content-end bg-primary" style={{color:"#fff"}}>see all</button></Link>
                                            )}
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default MyCompanyProjects