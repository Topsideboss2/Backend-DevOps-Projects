import { Form,Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import {  Link} from 'react-router-dom'
import image from "../../Assets/images/logo/lighmode.png"
import { useDispatch, useSelector } from 'react-redux';
import ForgotPasswordAction from '../../Redux/Actions/Auth/ForgotPassword.actions';
import { Oval } from 'react-loader-spinner';

export default function Forgot() {
  const dispatch=useDispatch()
  const loading= useSelector(state=>state.forgot.loading)
  return (
    <div class="vh-100">
    <div class="authincation h-100">
    <div class="container h-100">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6" style={{top:"50%",transform:"translate Y(-50%)"}}>
                <div class="authincation-content">
                    <div class="row no-gutters">
                        <div class="col-xl-12">
                            <div class="auth-form">
                            <div class="text-center mb-3">
                                    <Link to="/"><img src={image} alt="" style={{width:"60%",height:"30%"}}/></Link>
                                </div>
                                
                                <Formik
                                    initialValues={{
                                        "email":""
                                      
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string().email('Invalid email address').required('Required'),
                                      
                                       
                                    })}
                                    onSubmit={(values) => {
                                       dispatch(ForgotPasswordAction(values))
                                      }}>
                                    {({values, isSubmitting, errors, handleSubmit, handleChange,dirty,isValid}) => (
                                <Form >
                                   
                                    <div class="mb-3">
                                        <label class="mb-1"><strong>Email</strong></label>
                                        <input type="email"     
                                            class="form-control" 
                                            name="email"
                                            id="email"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        <div style={{color:"red"}}>
                                                    {errors.email}
                                            </div>
                                    </div>
                                    
                                  
                                    <div class="text-center">
                                        {loading&&(
                                        <button type="submit" disabled class="btn btn-primary btn-block">
                                            <div style={{placeItems:"center",display:"grid",top:"50%",transform:"translate Y(50%)"}}>
                                                <div style={{display:"flex", flexDirection:"row"}}>
                                                 <Oval  height="20"
                                                        width="20"
                                                        color='white'
                                                        ariaLabel='loading'/> 
                                                <span style={{fontSize:"20px"}}>please wait</span>
                                                </div>
                                            </div>
                                        </button>
                                        )}
                                        {!loading && (
                                            <button type="submit" disabled={dirty && isValid ? false : true} class="btn btn-primary btn-block">submit</button>
                                        )}
                                    </div>
                                </Form>
                                    )}
                                </Formik>
                                <div class="new-account mt-3">
                                     <Link to="/login">Back to login</Link>
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
