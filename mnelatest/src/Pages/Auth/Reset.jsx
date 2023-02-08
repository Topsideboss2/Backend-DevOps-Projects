import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Link,  useParams } from 'react-router-dom'
import image from "../../Assets/images/logo/lighmode.png"
import { Oval } from 'react-loader-spinner'
import ResetPasswordActions from '../../Redux/Actions/Auth/resetPassword.actions'

export default function Reset() {
  const dispatch=useDispatch()
  const {token,email}=useParams()
  const loading= useSelector(state=>state.reset.loading)
  return (
    <div class="vh-100">
    <div class="authincation " style={{padding:"20px"}}>
        <div class="container ">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6" style={{ top: "50%", transform: "translate Y(-50%)",padding:"10px !important" }}>
                    <div class="authincation-content" >
                        <div class="row ">
                            <div class="col-xl-12">
                                <div class="auth-form">
                                    <div class="text-center mb-2">
                                        <Link to="/"><img src={image} alt="" style={{width:"40%",height:"20%"}} /></Link>
                                    </div>
                                    
                                    <Formik
                                        initialValues={{
                                           
                                            "password": "",
                                            "password_confirmation": ""
                                        }}
                                        validationSchema={Yup.object({
                                            password: Yup.string().min(6, "Password too short").required('Required'),
                                            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),


                                        })}
                                        onSubmit={(values, { resetForm }) => {
                                          values['token'] = token
                                          values['email'] = email
                                            dispatch(ResetPasswordActions(values))
                                            resetForm({ values: "" })
                                        }}>
                                        {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                                            <Form >
                                                <div class="mb-3">
                                                    <label class="mb-1"><strong>Password</strong></label>
                                                    <input type="password"
                                                        class="form-control"
                                                        name='password'
                                                        id="password"
                                                        onChange={handleChange}
                                                        value={values.password}
                                                    />
                                                    <div style={{ color: "red" }}>
                                                        {errors.password}
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="mb-1"><strong>Password Confirmation</strong></label>
                                                    <input type="password"
                                                        class="form-control"
                                                        name='password_confirmation'
                                                        id="password_confirmation"
                                                        onChange={handleChange}
                                                        value={values.password_confirmation}
                                                    />
                                                    <div style={{ color: "red" }}>
                                                        {errors.password_confirmation}
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    {loading && (
                                                        <button type="submit" disabled class="btn btn-primary btn-block">
                                                            <div style={{ placeItems: "center", display: "grid", top: "50%", transform: "translate Y(50%)" }}>
                                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                                    <Oval height="20"
                                                                        width="20"
                                                                        color='white'
                                                                        ariaLabel='loading' />
                                                                    <span style={{ fontSize: "20px" }}>please wait</span>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    )}
                                                    {!loading && (
                                                        <button type="submit" disabled={dirty && isValid ? false : true} class="btn btn-primary btn-block">sign me up</button>
                                                    )}
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <div class="new-account mt-3">
                                        <p>Back to Login <Link to="/login">Login</Link></p>
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
