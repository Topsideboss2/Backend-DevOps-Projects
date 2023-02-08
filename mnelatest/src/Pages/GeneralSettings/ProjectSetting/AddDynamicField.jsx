import { useState, useEffect } from "react"
import * as Yup from "yup"
// import { requests } from "../../services/Api";
// import { getToken } from "../../services/useToken";
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Add, AddCircleOutline, AddOutlined, Close, Delete, DeleteOutline, Save } from "@mui/icons-material";
import { LocalStorage } from "../../../Utils/Hooks/useLocalStorage";
import { requests } from "../../../Utils/Services/Api";
import { Button, CardHeader, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CreateDynamicFieldAction from "../../../Redux/Actions/Settings/CreateDynamicField";
import { LoadingButton } from "@mui/lab";



function DynamicField({ newDynamicField },props) {
   
    const [option, setOption] = useState([])
    // const [loading, setLoading] = useState(false)
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.createDynamicField.loading)
    const response=useSelector(state=>state.createDynamicField.data)
    const navigate = useNavigate()
    const token = LocalStorage("token")
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
        dispatch(CreateDynamicFieldAction(data))
        setTimeout(() => {
            newDynamicField(data) 
            console.log("response",data)
        }, 500);
         
     
    }

 
    // branch handle
    const handleBranchChange = (e, i) => {
       
        if (e.target.value === 'select') {
            setOption(oldArray => [...oldArray, i])
        }
        let temp = { ...test }
        temp.branches[i][e.target.name] = e.target.value
        setTest(temp)
      
        
    }
    // handle option change
    const handleOptionsChange = (e, i, j) => {
        let temp = { ...test }
        temp.branches[i].option[j] = e.target.value
        setTest(temp)
    }
    // handle submit
    const submit = e => {
      
        e.preventDefault();
        const dataa = test.branches
        // const shifted = dataa.shift()
        const data = {
            data: dataa
        }
        postCompanyConfig(data)
        console.log("response",response)
    }

    return (

        <div class="m-4 d-flex justify-content-center flex-column">
            <CardHeader title="Add Dynamic Fields" />
            <Formik initialValues={{
                "name": "",
                "type": ""

            }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    type: Yup.string().required('Required')

                })}
                onSubmit={(values) => {
                    //    postProjectData(values)
                   
                }}>
                {({ values, isSubmitting, errors, handleSubmit, handleChange }) => (


                    <Form class=" " onSubmit={submit} novalidate>
                        {test.branches.map((branch, index) => (
                            <>
                                <TextField id="outlined-basic"
                                    label="Field Name"
                                    variant="outlined"
                                    name="name"
                                    style={{ margin: "15px" }}
                                    onChange={event =>  handleBranchChange(event, index)}
                                    value={test.branches[index].name}
                                    fullWidth
                                    errors
                                    helperText="required" />
                                <FormControl fullWidth style={{ margin: "15px" }}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="type"
                                        label="Age"
                                        onChange={event => handleBranchChange(event, index)}
                                        value={test.branches[index].type}
                                    >
                                        <MenuItem value={"text"}>Text</MenuItem>
                                        <MenuItem value={"email"}>Email</MenuItem>
                                        <MenuItem value={"file"}>File</MenuItem>
                                        <MenuItem value={"textArea"}>TextArea</MenuItem>
                                        <MenuItem value={"number"}>Number</MenuItem>
                                        <MenuItem value={"password"}>Password</MenuItem>
                                        <MenuItem value={"select"}>Select</MenuItem>
                                    </Select>

                                </FormControl>
                                {option.filter(item => item === index).map(() => (
                                    <>
                                        {branch.option.map((option, idx) => (
                                            <>
                                                <label class="text-label form-label" for="validationCustomUsername">DropDown fields</label>
                                                <div key={index}   >
                                                    {/* <label class="text-label form-label" for="validationCustomUsername">DropDown fields</label> */}
                                                    <div >
                                                        <Paper
                                                            component="form"
                                                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                                        >

                                                            <InputBase
                                                            name="option"
                                                                sx={{ ml: 1, flex: 1 }}
                                                                placeholder="Enter dropdown field name"
                                                                inputProps={{ 'aria-label': 'search google maps' }}
                                                                onChange={event => {
                                                                    handleOptionsChange(event, index, idx)
                                                               
                                                            }}
                                                                value={test.branches[index].option[idx]}
                                                            />

                                                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                                            <IconButton color="error" sx={{ p: '10px' }} aria-label="directions">
                                                                <DeleteOutline onClick={(event) => deleteOption(event, index, idx)} />
                                                            </IconButton>
                                                        </Paper>
                                                        <div class="invalid-feedback">
                                                            Please input a dropdown field
                                                        </div>
                                                    </div>
                                                    <Box>
                                                        <AddOutlined color="success" onClick={event => addOption(event, index)} />
                                                    </Box>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ))}
                               { index>0 &&(
                               <DeleteOutline color="error" fontSize="large" style={{ float: "right" }} onClick={(event) => deleteBranch(event, index)} />)}
                            </>
                        ))}

                        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                            {/* <Button variant="text" style={{color:"#FF5E4B",margin:"5px"}} startIcon={<Close/>} onClick={()=>toggle()}>Close</Button> */}
                            {/* <Button variant="contained" onClick={submit} style={{ color: "#fff", background: "#00a15d", margin: "5px" }} startIcon={<Save />}>Save</Button> */}
                          
                                            
                                        <LoadingButton
                                       
                                        type="button"
                                            size="medium"
                                            // color="#00a15d"
                                            style={{backgroundColor:"#00a15d",color:"#fff"}}
                                            onClick={submit}
                                            // disabled={dirty && isValid  ? false : true}
                                            loading={loading}
                                            loadingPosition="start"
                                            startIcon={<Save />}
                                            variant="contained"
                                        >
                                            Save
                                        </LoadingButton>


                                 
                            <LoadingButton size="large" variant="outlined" onClick={addBranch} style={{ color: "#00a15d", margin: "5px" }} startIcon={<Add />}>Add </LoadingButton>
                        </Box>
                    </Form>
                )}

            </Formik>

        </div>

    )
}

export default DynamicField;