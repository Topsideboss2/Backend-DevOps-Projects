import React, { useEffect, useState } from 'react'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../Utils/Services/Api'


export default function CompanyProjects() {
const [companyProjects,setCompanyProjects]=useState([])
const token=LocalStorage()
    const getProjectsInfo=async()=>{
        await requests.get(`company/profile`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{ 
               console.log("company projects profile",response.data)
            setCompanyProjects(response.data)
            
        }).catch((error)=>{
            console.log("projectmember error",error)
        })
      }
      useEffect(() => {
  
        getProjectsInfo()
            
      }, [])
  return (
    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-statistics">
                                    <div class="text-center">
                                        <div class="row">
                                            <div class="col">
                                                <h3 class="m-b-0">{companyProjects.projects}</h3><span>Projects</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">{companyProjects.members}</h3><span>Members</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">{companyProjects.activities}</h3><span>Activities</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* <!-- Modal --> */}
                                  
                                </div>
                            </div>
                        </div>
                    </div>
  )
}
