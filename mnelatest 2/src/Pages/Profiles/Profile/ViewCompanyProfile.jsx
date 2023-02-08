import React, { useEffect, useState } from 'react'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../Utils/Services/Api'


export default function ViewCompanyProfile() {
    const [loading,setLoading]=useState(false)
    const [companydata,setCompanyData]=useState([])
    const token=LocalStorage("token")
    const user=LocalStorage("user")
    

    const getCompanyData=async()=>{
        setLoading(true)
        await requests.get("/company/companysettings",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{ 
           setLoading(false)
            setCompanyData(response.data)
            console.log("company profile data",companydata)

        }).catch((error)=>{
            console.log("or",error)
        })
    }
    
    useEffect(() => {
        getCompanyData()
    }, [])
  return (
    <div class="profile-personal-info">
        <h6 class="text-primary mb-4">Company Information</h6>
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
            <div class="col-sm-9 col-7"><span>{companydata.primary_email}</span>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-sm-3 col-5">
                <h5 class="f-w-500">Phone Number <span class="pull-end">:</span></h5>
            </div>
            <div class="col-sm-9 col-7"><span>{companydata.primary_phone}</span>
            </div>
        </div>
        
        <div class="row mb-2">
            <div class="col-sm-3 col-5">
                <h5 class="f-w-500">Address <span class="pull-end">:</span></h5>
            </div>
            <div class="col-sm-9 col-7"><span>{companydata.primary_address}</span>
            </div>
        </div>
        
    </div>
  )
}
