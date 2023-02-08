import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { DialogActions, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import SetupRoleAction from '../../../Redux/Actions/UserManagement/createRole'

export default function AddRoles({handleClose,handleAdd}) {
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.createRole.loading)
    const addedRole=useSelector(state=>state.createRole.data)

    console.log("addedRole",addedRole)
    const SubmitRole=(data)=>{
        dispatch(SetupRoleAction(data))
        handleAdd(addedRole)
    }
    return (
        <div>
            <Box style={{}}>
                <Typography variant="h5" class="text-capitalize">Add a Role</Typography>
            </Box>
            <Formik
                initialValues={{
                    "name": "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                })}
                onSubmit={(values, { resetForm }) => {

                    
                    SubmitRole(values)
                    resetForm({ values: "" })
                   
                }}
            >
                {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                    <Form>
                        <div class="">
                            <div class="mb-3">
                                
                                <TextField
                                    id='name'
                                    label="Role Name"
                                    variant="outlined"
                                    name='name'
                                    type="name"
                                    onChange={handleChange}
                                    value={values.name} 
                                    fullWidth/>

                                <div style={{ color: "red" }}>
                                    {errors.name}
                                </div>
                            </div>

                        </div>

                        <DialogActions>
                            {/* <div class="modal-footer" style={{ display: "flex" }}> */}
                            
                                <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" onClick={handleClose} >Close</button>
                                <LoadingButton
                                    type="submit"
                                    size="medium"
                                    style={{ backgroundColor: "#00a15d", color: "#fff" }}
                                    // onClick={postCompanyConfig}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="contained"
                                >
                                    Save
                                </LoadingButton>
                          
                            {/* </div> */}
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
