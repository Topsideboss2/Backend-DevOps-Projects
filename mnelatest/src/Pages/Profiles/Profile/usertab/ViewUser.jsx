import React, { useEffect } from 'react'
import { LocalStorage } from '../../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../../Utils/Services/Api'


function ViewUser() {
    const user=LocalStorage("user")
    const [activedata,setActiveData]=React.useState({})
    const token=LocalStorage("token")

    const checkActive = async () => {
        await requests.get(`/company/active`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => {
          console.log("activepp", response.data)    
         setActiveData(response.data)
        }).catch(error => {
         console.log("error",error)
        })
      }
      useEffect(()=>{
         
          checkActive()
      },[])
  return (
    <div class="profile-personal-info">
                            <h6 class="text-primary mb-4">Personal Information</h6>
                            <div class="row mb-2">
                                <div class="col-sm-3 col-5">
                                    <h5 class="f-w-500">Name <span class="pull-end">:</span>
                                    </h5>
                                </div>
                                <div class="col-sm-9 col-7"><span>{user.name}</span>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-sm-3 col-5">
                                    <h5 class="f-w-500">Email <span class="pull-end">:</span>
                                    </h5>
                                </div>
                                <div class="col-sm-9 col-7"><span>{user.email}</span>
                                </div>
                            </div>
                            
                          
                            
                        </div>
  )
}

export default ViewUser