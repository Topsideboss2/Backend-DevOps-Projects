import React, { useEffect, useState } from 'react'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../Utils/Services/Api'


export default function UserProject() {
    const [userProjects,setUserProjects]=useState([])
const token=LocalStorage("token")
    const getProjectsInfo=async()=>{
        await requests.get(`users/profile`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{ 
               console.log("user projects profile",response.data)
            setUserProjects(response.data)
            
        }).catch((error)=>{
            console.log("userProfile info error",error)
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
                            <h3 class="m-b-0">{userProjects.projects}</h3><span>Projects</span>
                        </div>
                        <div class="col">
                            <h3 class="m-b-0">{userProjects.tasks}</h3><span>Tasks</span>
                        </div>
                        <div class="col">
                            <h3 class="m-b-0">{userProjects.activities}</h3><span>Activities</span>
                        </div>
                    </div>
                    
                </div>
                
              
            </div>
        </div>
    </div>
</div>
  )
}
