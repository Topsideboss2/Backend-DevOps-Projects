import React from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import {Formik,Form} from "formik"
import * as Yup from "yup"
import image from "../../Assets/images/logo/lighmode.png"
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import LoginActions from '../../Redux/Actions/Auth/Login.actions'


export default function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const loading= useSelector(state=>state.login.loading)

 
    
  return (
    <div class="vh-100" style={{overflow:"hidden"}}>
    <div class="authincation h-100">
    <div class="container h-100">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6" style={{top:"50%",transform:"translate Y(-50%)",padding:"15px"}}>
                <div class="authincation-content" >
                    <div class="row no-gutters">
                        <div class="col-xl-12">
                            <div class="auth-form">
                                <div class="text-center mb-3">
                                    <Link to="/"><img src={image} alt="" style={{width:"60%",height:"30%"}}/></Link>
                                </div>
                                {/* <h4 class="text-center mb-4">Log in to your company</h4> */}
                                <Formik
                                initialValues={{
                                    "email":"",
                                    "password":""
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                  password: Yup.string().required('Required'),
                                   
                                })}
                                onSubmit={(values) => {
                                //    LoginUser(values)
                                dispatch(LoginActions(values,navigate))
                                console.log("values",values)
                                  }}
                                  >
                                {({values, isSubmitting, errors, handleSubmit, handleChange,isValid,
                                    dirty}) => (

                                <Form >
                                  

                    
                                    <div class="mb-3">
                                        <label class="mb-1"><strong>Email</strong></label>
                                        <input type="email" 
                                            class="form-control" 
                                            name='email'
                                            id="email"
                                            onChange={handleChange}
                                            value={values.emai}
                                        />
                                        <div style={{color:"red"}}>
                                                {errors.email}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="mb-1"><strong>Password</strong></label>
                                        <input type="password" 
                                            class="form-control"
                                            name="password"
                                            id="password"
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        <div style={{color:"red"}}>
                                                {errors.password}
                                        </div>
                                    </div>
                                        <Link to="/forgot-password" class="mb-2">forgot password ?</Link>
                                <div class="text-center mt-2">
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
                                        <button type="submit" disabled={dirty && isValid ? false : true} class="btn btn-primary btn-block" 
                                       
                                        >sign me in</button>
                                    )}
                                </div>
                                </Form>
                                )}
                                </Formik>
                                <div class="new-account mt-3">
                                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
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
