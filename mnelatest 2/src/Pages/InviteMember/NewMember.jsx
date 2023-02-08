import React, { useState } from 'react'
import "../../Assets/styles/styles.css"
import {useNavigate,useParams } from "react-router-dom"
import * as Yup from "yup"
import {Formik,Form} from "formik"
import { TextField } from '@mui/material'
import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import RegisterMemberAction from '../../Redux/Actions/InviteMembers/registerInvited'
import { useDispatch, useSelector } from 'react-redux'

function NewMemberRegister() {
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.registerInvited.loading)??false
    const navigate = useNavigate()
    const {token,company_id,email}=useParams()

    const RegisterNewUser= async(values)=>{
    
        const dataa={
            name:values.name,
            email:email,
            password:values.password,
            password_confirmation:values.password_confirmation,
            token:token,
            company_id:company_id
        }
   
       dispatch (RegisterMemberAction (dataa,navigate) )
    }
      
      
  return (
    <div class="vh-100">
    <div class=" h-100 authincation">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6" style={{top:"50%",transform:"translate Y(-50%)"}}>
                <div class="authincation-content">
                    <div class="row no-gutters">
                        <div class="col-xl-12 col-lg-12">
                            <div class="card">
                            <div class="card-header center" >
                                <h4 class="card-title">Register here </h4>
                            </div>
                            <div class="card-body">
                                <div class="basic-form">
                                <Formik
                                    initialValues={{
                                        "email":"",
                                        "name":"",
                                        "password":"",
                                        "password_confirmation":""
                                    }}
                                    validationSchema={Yup.object({
                                        name:Yup.string().min(3,"name too short").required("Required"),
                                        email:Yup.string().email("invalid email").required("required"),
                                        password: Yup.string().min(6, "Password too short").required('Required'),
                                        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),  
                                    })}
                                    onSubmit={(values) => {
                                       RegisterNewUser(values)
                                       console.log("values",values)
                                      }}
                                      enableReinitialize
                                      >
                                    {({values, isSubmitting, errors, handleSubmit, handleChange}) => (
                                    <Form> 
                                        <div class="row">
                                            <div class="mb-3 col-md-112">
                                               
                                                <TextField type="text"
                                                fullWidth
                                                variant='outlined'
                                                label="firstName"
                                                name="name"
                                                id="name"
                                                value={values.name}
                                                 onChange={handleChange}/>
                                             
                                                  <div style={{color:"red"}}>
                                                        {errors.name}
                                                    </div>
                                            </div>
                                            <div class="mb-3 col-md-12">

                                                 
                                            <TextField type="email"
                                                fullWidth
                                                variant='outlined'
                                                label="Email"
                                                name="email"
                                                id="email"
                                                value={email}
                                                 onChange={handleChange}/>
                                              
                                                 <div style={{color:"red"}}>
                                                    {errors.email}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-12">
                                            <TextField type="password"
                                                fullWidth
                                                variant='outlined'
                                                label="Password"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                onChange={handleChange}/>                                             
                                                  <div style={{color:"red"}}>
                                                        {errors.password}
                                                    </div>
                                            </div>
                                            <div class="mb-3 col-md-12">
                                            <TextField type="password"
                                                fullWidth
                                                variant='outlined'
                                                label="Confirm Password"
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                value={values.password_confirmation}
                                                onChange={handleChange}/>
                                             
                                                 <div style={{color:"red"}}>
                                                    {errors.password_confirmation}
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <div class="modal-footer" >
                                        <LoadingButton
                                    type="button"
                                    size="medium"
                                    style={{ backgroundColor: "#00a15d", color: "#fff" }}
                                    onClick={()=> RegisterNewUser(values)}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="contained"
                                >
                                    Save
                                </LoadingButton>
                                        </div>
                                  
                                        
                                    </Form>
                                    )}
                                    </Formik>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default NewMemberRegister;