import React, { useState } from 'react'
import {Form ,Formik} from "formik"
import * as Yup from "yup"
import { Oval } from 'react-loader-spinner'
import {LocalStorage} from "../../Utils/Hooks/useLocalStorage"
import { useDispatch, useSelector } from 'react-redux'
import GeneralSettingsAction from '../../Redux/Actions/Settings/System.action'
import ReactPhoneInput from "react-phone-input-2";
// import "react-phone-input-2/dist/style.css";
import 'react-phone-input-2/lib/style.css'
import FileInputReal from '../../Utils/Components/FileInputReal'
import "../../Assets/styles/styles.css"
import { Button, TextField } from '@mui/material'

function SystemSettingForm() {
    
    const [logo,setLogo]=useState()
    const [phone, setPhone] = useState("")
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.systemSetting.loading)
    const token=LocalStorage("token")

    // const validate=()=>{
    //     let temp={}
    //     temp.primary_address=values.primary_address
    // }

    const getfile=(file)=>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setLogo(reader.result)
          console.log(logo);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
          };
    }
  
    const postSystemData=async(values)=>{
        const data={...values,logo:logo}
        console.log("logo",data)
        dispatch(GeneralSettingsAction(data))
        // await requests.post("/companysettings",  values,{
        //     headers:{
        //         "Authorization":`Bearer ${token}`
        //     }
        // }).then((response)=>{
        //     setLoading(false)
        //     console.log("response",response)
        //     setLoading(false);   
        //     setSuccessResponse("you have successfully setup your default credentials")
             
        //     setTimeout(() => {
        //       setSuccessResponse("")
        //     }, 5000);
        //     // navigate("/dynamic-fields")
        // }).catch((error)=>{
           
        //     setLoading(false);
        //     console.log('error',error.response.status)
        //     setServerError(error.response.data.message)

        //     if (error.response.status === 401){
        //         setTimeout(() => {
        //             navigate("/login")
        //         }, 2000);
        //     }
           
        //     setTimeout(()=>{
        //       setServerError("")
        //     },5000) 
        // })
    }
  return (
    <div class="col-xl-12 col-lg-12">
     
        <div class="card-body">
            <div class="basic-form ">
                <Formik
                    initialValues={{
                        "primary_email":"",
                        "primary_phone":"",
                        "primary_address":"",
                                                        
                    }}
                    validationSchema={Yup.object({
                        primary_address:Yup.string().required("Required"),
                        primary_phone:Yup.number().min(10,"number too short").required("required"),
                        primary_email:Yup.string().email("invalid email").required("required"),
                        
                        
                        
                    })}
                    onSubmit={(values,{resetForm}) => {
                      
                    //   values['phone'] = phone
                    //   values['logo'] = logo
                      postSystemData(values)
                      
                        }}>
                    {({values, isSubmitting, errors, handleSubmit, handleChange,isValid,dirty}) => (
                    <Form id="Formid">
                        <div class={"row"}>
                    <div class="mb-3  col-sm-12 col-md-6">
                        <label class="col-form-label text-capitalize sub-sub-t">Notification email</label>
                        <div class="col-sm-12">
                        <TextField
                            fullWidth
                            type="email"
                            label="Primary Email"
                            name="primary_email"
                            id="primary_email"
                            value={values.primary_email}
                            onChange={handleChange}
                            error={errors.primary_email?true:false}
                            helperText={errors.primary_email}
                            />
                          
                        </div>
                    </div>
                    <div class="mb-3 col-sm-12 col-md-6">
                        <label class=" col-form-label text-capitalize sub-sub-t">Notification phone number</label>
                        <div class="col-sm-12">
                        <TextField
                            fullWidth
                            type="number"
                            label="Primary Phone Number"
                            ame="primary_phone"
                            id="primary_phone"
                            value={values.primary_phone}
                            onChange={handleChange}
                            error={errors.primary_phone?true:false}
                            helperText={errors.primary_address}
                            />
                            
                        </div>
                    </div>
                    <div class="mb-3  col-sm-12 col-md-6">
                        <label class=" col-form-label text-capitalize sub-sub-t">address</label>
                        <div class="col-sm-12">
                            <TextField
                            fullWidth
                            type="text"
                            label="Address"
                            name='primary_address'
                            id="primary_address"
                            value={values.primary_address}
                            onChange={handleChange}
                            error={errors.primary_address?true:false}
                            helperText={errors.primary_address}/>
                            
                             
                        </div>
                    </div>
                    <div class="mb-3 row col-sm-12 col-md-6 ">
                        <label class=" col-form-label text-capitalize sub-sub-t">logo</label>
                        {/* <div class="col-sm-12">
                            <input type="file" 
                            class="form-control"
                            accept=".png,.jpeg,.jpg"
                             name="logo"
                             id="logo"
                             value={values.logo}
                             onChange={handleChange}/>
                              <div style={{color:"red"}}>
                                        {errors.logo}
                                </div>
                        </div> */}
                           <FileInputReal getfile={getfile} title={"Company Logo"}/>
                    </div>
                 
                   
                    </div>
                    <div class="mb-3 " style={{display:"flex",justifyContent:"flex-end "}}>
                        {loading&&(
                        <div class="">
                            <button type="submit" disabled={true} class=" btn-primary btn ">
                                <div style={{placeItems:"center",display:"grid",top:"50%",transform:"translate Y(50%)"}}>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                    <Oval  height="20"
                                            width="20"
                                            color='white'
                                            ariaLabel='loading'/>
                                    <span style={{fontSize:"20px"}}>submitting</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        )}
                        {!loading && (
                            <div class="">
                                {/* <button type="submit" disabled={dirty && isValid ? false : true} class="btn btn-primary btn-lg ">submit</button> */}
                                <Button type="submit" class="btn btn-primary  " style={{backgroundColor:"#00d47a"}} disabled={dirty && isValid ? false : true}>Submit</Button>
                            </div>
                        )}
                       
                    </div>
                </Form>
                    )}
            </Formik>        
            </div>
        </div>
 
</div>
  )
}

export default SystemSettingForm