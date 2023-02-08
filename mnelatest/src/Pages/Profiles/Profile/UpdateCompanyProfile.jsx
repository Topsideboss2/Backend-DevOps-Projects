import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage'
import { requests } from '../../../Utils/Services/Api'



export default function UpdateCompanyProfile() {
    const [loading,setLoading]=useState(false)
    const [companydata,setCompanyData]=useState([])
    const [successResponse,setSuccessResponse]=useState("")
    const [serverError,setServerError]=useState("")
    const token=LocalStorage("token")
    const user=LocalStorage("user")

    const updateSystemData=async(values)=>{
        setLoading(true)
        await requests.post("/company-companysettings",  values,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((response)=>{
            setLoading(false)
            console.log("response",response)
            setLoading(false);   
            setSuccessResponse("you have successfully updated your default credentials")
             
            setTimeout(() => {
              setSuccessResponse("")
            }, 5000);
            // navigate("/dynamic-fields")
        }).catch((error)=>{
           
            setLoading(false);
            console.log('error',error.response.status)
            setServerError(error.response.data.message)

           
            setTimeout(()=>{
              setServerError("")
            },5000) 
        })
    }
    

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
    <div class="pt-3">
    <div class="settings-form">
        <h4 class="text-primary">Account Setting</h4>
        <Formik
                initialValues={companydata||{
                    "primary_email":"",
                    "primary_phone":"",
                    "primary_address":"",
                   
                   
                    
                }}
               
                  onSubmit={(values) => {
                    
                //    UpdateMilestonefunc(values);
                updateSystemData(values)
                    console.log("submit values",values)
                  }}
                  enableReinitialize
            >
                 {({values, isSubmitting, errors, handleSubmit, handleChange}) => (
                   
        <Form>
            <div class="row">
                <div class="mb-3 col-md-6">
                    <label class="form-label">Name</label>
                    <input type="email" placeholder="text" class="form-control" value={user.name} disabled/>
                </div>
                <div class="mb-3 col-md-6">
                    <label class="form-label">Default Email</label>
                    <input type="email" 
                            class="form-control"
                             placeholder="Email"
                             name="primary_email"
                             id="primary_email"
                             value={values.primary_email}
                             onChange={handleChange}/>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input type="number" 
                            class="form-control" 
                            placeholder="your phone number"
                            name="primary_phone"
                            id="primary_phone"
                            value={values.primary_phone}
                            onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label class="form-label">Address </label>
                <input type="text"
                             class="form-control" 
                             placeholder="your address"
                             name='primary_address'
                             id="primary_address"
                             value={values.primary_address}
                             onChange={handleChange}
                             />
            </div>
           
            <button class="btn btn-primary" type="submit" onSubmit={()=>updateSystemData(values)}>save</button>
           
        </Form>
                 )}
            </Formik>
    </div>
</div>
  )
}
