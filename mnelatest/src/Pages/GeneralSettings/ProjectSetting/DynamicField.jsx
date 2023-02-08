import { useState, useEffect } from "react"
import MultipleValueTextInput from 'react-multivalue-text-input';
import { requests } from "../../services/Api";
import { getToken } from "../../services/useToken";
import { BsPlusCircleFill, BsTrashFill } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip'
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import $ from "jquery"


function DynamicField({ parentCallBack }) {
    const [option, setOption] = useState([])
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [successResponse, setSuccessResponse] = useState("")
    const navigate = useNavigate()

    const token = getToken()
    const [test, setTest] = useState({ branches: [{ name: "", type: "", option: [""] }] })
    // add branch
    const addBranch = (e) => {
        let temp = { ...test };
        temp.branches.push({ name: "", type: "", option: [""] });
        setTest(temp);
    };

    // add options
    const addOption = (e, i) => {
        let temp = { ...test };
        temp.branches[i].option.push('');
        setTest(temp);
    };

    // delete branch
    const deleteBranch = (e, i) => {
        let temp = { ...test }
        temp.branches.splice(i, 1)
        setTest(temp)
    }
    // hide modal


    // delete option
    const deleteOption = (e, i, j) => {
        let temp = { ...test }
        temp.branches[i].option.splice(j, 1)
        setTest(temp)
    }

    // post data
    const postCompanyConfig = async (data) => {
        setLoading(true)
        const response = await requests.post("/fields", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {

            console.log("field parant call back", data.data)
            setLoading(false);
            setSuccessResponse("input fields have successfully registered a  dynamic field")
            data.data.map((d) => {
                parentCallBack(d)
            })

            setTimeout(() => {
                setSuccessResponse("")
                handleCloseModal()
            }, 5000);


        }).catch((error) => {
            console.log("field-error", error.response)
            setLoading(false);
            console.log('error', error)
            setServerError(error.response.data.message)
            setTimeout(() => {
                setServerError("")
            }, 5000)
        })
    }
    // branch handle
    const handleBranchChange = (e, i) => {
        if (e.target.value === 'select') {
            setOption(oldArray => [...oldArray, i])
        }
        let temp = { ...test }
        temp.branches[i][e.target.name] = e.target.value
        setTest(temp)
        console.log("fields test", test)
    }
    // handle option change
    const handleOptionsChange = (e, i, j) => {
        let temp = { ...test }
        temp.branches[i].option[j] = e.target.value
        setTest(temp)
        console.log("options test", test)
    }
    // handle submit
    const submit = e => {
        e.preventDefault();
        const dataa = test.branches
        const shifted = dataa.shift()
        const data = {
            data: dataa
        }
        postCompanyConfig(data)
    }

    //close modal
    const handleCloseModal = () => {
        document.getElementById('dynamicField').classList.remove('show', 'd-block');
        document.querySelectorAll('.modal-backdrop').forEach(el => el.classList.remove('modal-backdrop'))
    }

    return (
        <div class="modal fade" id="dynamicField">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Dynamic Fields</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Please Enter the Details Below</h4>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="basic-form">
                                    <Formik
                                        initialValues={{
                                            "name": "",
                                            "type": ""

                                        }}
                                        validationSchema={Yup.object({
                                            name: Yup.string().required('Required'),
                                            type: Yup.string().required('Required')

                                        })}
                                        onSubmit={(values) => {
                                            //    postProjectData(values)
                                            console.log(values)
                                        }}>
                                        {({ values, isSubmitting, errors, handleSubmit, handleChange }) => (
                                            <Form class="form-valide-with-icon needs-validation" onSubmit={submit} novalidate>
                                                {serverError && (
                                                    <div style={{ padding: "10px", margin: "20px", color: "red", fontSize: "15px" }}>
                                                        {serverError && (<p>{serverError}</p>)}
                                                    </div>

                                                )}
                                                {successResponse && (
                                                    <div style={{ padding: "10px", margin: "20px", color: "green", fontSize: "15px" }}>
                                                        {successResponse}
                                                    </div>

                                                )}

                                                {test.branches.map((branch, index) => (
                                                    <div key={index} style={{ display: index === 0 ? "none" : "" }} >
                                                        <div class="mb-3">
                                                            <label class="text-label form-label" for="validationCustomUsername">Project field Name</label>
                                                            <div class="input-group">
                                                                <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                                                <input type="text"
                                                                    class="form-control"
                                                                    name="name"
                                                                    placeholder="Enter a project field Name.."

                                                                    onChange={event => handleBranchChange(event, index)}
                                                                    // onChange={event=>console.log(test.branches[index].name)}
                                                                    value={test.branches[index].name}
                                                                />
                                                                <div class="invalid-feedback">
                                                                    Please a project field Name.
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div class="input-group mb-3">
                                                            <label class="input-group-text mb-0">type</label>
                                                            <select
                                                                name="type"
                                                                class="default-select form-control wide"
                                                                onChange={event => handleBranchChange(event, index)}
                                                                value={test.branches[index].type}
                                                            >
                                                                <option value="">choose a field type</option>
                                                                <option value="text" selected>text</option>
                                                                <option value="date">date</option>
                                                                <option value="email">email</option>
                                                                <option value="number">number</option>
                                                                <option value="file">file</option>
                                                                <option value="password">password</option>
                                                                <option value="select" >dropdown</option>
                                                                <option value="textarea">textarea</option>
                                                            </select>
                                                            <div class="invalid-feedback">
                                                                Please select a project field type.
                                                            </div>
                                                        </div>
                                                        {option.filter(item => item === index).map(() => (

                                                            <>
                                                                {branch.option.map((option, idx) => (
                                                                    <div key={index}   >
                                                                        <label class="text-label form-label" for="validationCustomUsername">DropDown fields</label>
                                                                        <div class="input-group">
                                                                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                                                            <input type="text"
                                                                                class="form-control"
                                                                                id="name"
                                                                                name="name"
                                                                                placeholder="Enter a dropdown option name.."
                                                                                onChange={event => handleOptionsChange(event, index, idx)}
                                                                                value={test.branches[index].option[idx]}
                                                                            />
                                                                            <button class="btn btn-danger light" onClick={(event) => deleteOption(event, index, idx)} style={{ right: "0", marginLeft: "85%" }}>Remove</button>

                                                                            <div class="invalid-feedback">
                                                                                Please input a dropdown field
                                                                            </div>
                                                                        </div>

                                                                        <BsPlusCircleFill onClick={event => addOption(event, index)} class="plus-button tooltipp" />


                                                                    </div>


                                                                ))}

                                                            </>

                                                        ))}
                                                        <BsTrashFill class="btn-danger light" onClick={(event) => deleteBranch(event, index)} style={{ right: "0", marginLeft: "85%" }} />

                                                    </div>
                                                ))}
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={addBranch} class="btn light btn-dark">Add fields</button>
                                <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                                <button type="submit" onClick={submit} class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DynamicField;