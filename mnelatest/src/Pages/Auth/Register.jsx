import React, { useState } from 'react'
import image from "../../Assets/images/logo/lighmode.png"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import ReactPhoneInput from "react-phone-input-2";
// import "react-phone-input-2/dist/style.css";
import 'react-phone-input-2/lib/style.css'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import RegisterActions from '../../Redux/Actions/Auth/Register.actions'

export default function Register() {
    const [phone, setPhone] = useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const loading= useSelector(state=>state.register.loading)
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
                                                    "email": "",
                                                    "name": "",
                                                    "password": "",
                                                    "password_confirmation": ""
                                                }}
                                                validationSchema={Yup.object({
                                                    name: Yup.string().min(3, "name too short").required("Required"),
                                                    // phone:Yup.string().min(10,"number too short").required("required"),
                                                    email: Yup.string().email("invalid email").required("required"),
                                                    password: Yup.string().min(6, "Password too short").required('Required'),
                                                    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),


                                                })}
                                                onSubmit={(values, { resetForm }) => {
                                                    values['phone'] = phone
                                                    dispatch(RegisterActions(values,navigate))
                                                    resetForm({ values: "" })
                                                }}>
                                                {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                                                    <Form >

                                                        <div class="mb-3">
                                                            <label class="mb-1"><strong>Company Name</strong></label>
                                                            <input type="name"
                                                                class="form-control"
                                                                name="name"
                                                                id="name"
                                                                onChange={handleChange}
                                                                value={values.name} />
                                                            <div style={{ color: "red" }}>
                                                                {errors.name}
                                                            </div>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="mb-1"><strong> Company Email</strong></label>
                                                            <input type="email"
                                                                class="form-control"
                                                                name="email"
                                                                id="email"
                                                                onChange={handleChange}
                                                                value={values.email}
                                                            />
                                                            <div style={{ color: "red" }}>
                                                                {errors.email}
                                                            </div>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="mb-1"><strong>Company Number</strong></label>

                                                            <ReactPhoneInput
                                                                class="form-control"
                                                                defaultCountry="ke"
                                                                // name="phone"
                                                                // id="phone"
                                                                required
                                                                containerStyle={{ marginTop: "15px" }}
                                                                searchClass="search-class"
                                                                searchStyle={{ margin: "0", width: "97%", height: "30px" }}
                                                                enableSearchField
                                                                disableSearchIcon
                                                                value={phone}
                                                                onChange={(e) => setPhone(e)}


                                                            />
                                                            <div style={{ background: "lightgray", color: "red" }}>
                                                                {errors.phone}
                                                            </div>
                                                        </div>
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
                                                <p>Already have a company <Link to="/login">Login</Link></p>
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
