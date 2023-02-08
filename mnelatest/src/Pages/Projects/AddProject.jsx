import { Box, Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Formik } from 'formik';
import moment from 'moment';
import * as Yup from "yup"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';
import AutoComplete from '../../Utils/Components/Atocomplete';
import FileInputReal from '../../Utils/Components/FileInputReal';
import DynamicFields from './DynamicFields';
import { Delete, Save } from '@mui/icons-material';
import Toggle from '../../Utils/Hooks/UseToggle';
import { useDispatch, useSelector } from 'react-redux';
import GetCompanyUserAction from '../../Redux/Actions/Users/GetUsersAction';
import { LoadingButton } from '@mui/lab';
import CreateProjectsAction from '../../Redux/Actions/Projects/AddProjects';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from 'lodash';
import debounce from 'lodash.debounce'


export default function AddProject() {
    const [description, setDescription] = useState()
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [address, setAddress] = useState()
    const [title,setTitle]=useState("")
    const [projectImage, setProjectImage] = useState()
    const [fieldarr, setFieldArr] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [del, setDel] = Toggle(false);
    const [fieldId, setFieldID] = useState()
    const [member, setMember] = useState([])
    const [members, setMembers] = useState([])
    const [removedidx, setRemovedIdx] = useState([])
    const loading = useSelector(state => state.createdProject.loading)
    const dispatch = useDispatch()
    const companyMembers = useSelector(state => state.companyUsers.data)

    console.log("companyMembers", companyMembers)



    const handleMapsData = (childData) => {
        setAddress(childData)
    }

    const getfile = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setProjectImage(reader.result)

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const getDynamicProps = (child) => {
        setFieldArr(prev => [...prev, child])
        console.log("FeldPrep", fieldarr)

    }

    // delete dynamics
    const deleteDynamic = (idd) => {
        setDel()
        const objWithIdIndex = fieldarr.findIndex((obj) => obj.id === idd.id);
        console.log("objwithidxini", fieldarr)
        if (objWithIdIndex > -1) {
            fieldarr.splice(objWithIdIndex, 1);
        }
        console.log("objwithidx", fieldarr)
        setFieldArr(fieldarr)



        setFieldID(idd)
    }
    const handleChangeFields = (e, index) => {
        console.log('event', e.target.name)
        console.log('value', e.target.value)
        console.log('index', index)
        
        

        let temp = { ...inputFields }
      
        
        // temp = {
        //     [e.target.name]: e.target.value,
            
        // };
       
        // temp[index][e.target.name]=e.target.value
        // temp[index][e.target.name] = e.target.value
        setInputFields(prev=>[...prev,temp])

        console.log('inputFields', temp)
    }

    const debouncedChangeHandler = useCallback(
        debounce(handleChangeFields, 300)
      , []);


    function debounce(func, timeout = 500){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
    function saveInput(event, index) {
        // console.log('event', event.target.value);
        // console.log('index', index)
    }

    const Submit = (values) => {
        const project = {
            title:title,
            start_date:startDate,
            end_date:endDate,
            user_id:member,
            // project_image:projectImage,
            description:description,
            latitude: address.lat,
            longitude: address.lng,
            data: [...inputFields]
        }

        dispatch(CreateProjectsAction(project))
        console.log("project", project)
      
    }
  

    const ProjectSchema = Yup.object().shape({
        // title: Yup.string().required('Required'),
        // description: Yup.string().required("required"),
        // member: Yup.string().required("Please select a project Manager").oneOf(companyMembers),
        // startDate: Yup.date().required("required"),
        // endDate: Yup.date().required("required").min(Yup.ref('startDate'), "end date can't be before start date"),
        // end_date: Yup.string().required("required")
    });
  
      const processChange = debounce((event, index) => saveInput(event, index));
     
    useEffect(() => {
        dispatch(GetCompanyUserAction())


    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <Card sx={{ p: 4 }}>
                    <Typography class="text-capitalize text-center" variant="h6" style={{ fontSize: "1.25rem", color: "#00a15d" }}>Create a project</Typography>
                    <Formik
                        initialValues={{
                            "title": "",
                            "location": "",
                            "description": "",
                            "start_date": "",
                            "end_date": "",
                            "user_id": ""
                        }}
                        validationSchema={ProjectSchema}
                        onSubmit={(values) => {
                            values["user_id"] = member
                            Submit(values)
                            
                            // console.log(inputFields)
                        }}>
                        {({ values, isSubmitting, errors, touched, handleSubmit, handleChange }) => (

                            <Form>
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            label="Name"
                                            name="title"
                                            id={Object.keys(errors => errors.title.length > 0) ? "outlined-error-helper-text" : "title"}
                                            fullWidth
                                            onChange={e=>setTitle(e.target.value)}
                                            // helperText={Object.keys(errors =>errors.title.length>0 )?:""}
                                            value={title}
                                            required />
                                        {/* {Object.keys(errors => errors.title.length > 0) && (
                                            <FormHelperText sx={{ color: "#db3700" }}>{errors.title}</FormHelperText>)} */}

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Project Manager</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"                                              
                                                
                                                label="Project Manager "
                                                onChange={(e) => setMember(e.target.value)}
                                            >
                                                {companyMembers?.map((member, index) => {
                                                    return (
                                                        <MenuItem value={member.user_id}>{member.user_name}</MenuItem>
                                                    )
                                                })}


                                            </Select>
                                            {/* {Object.keys(errors => errors.user_id.length > 0) && (
                                                <FormHelperText sx={{ color: "#db3700" }}>{errors.user_id}</FormHelperText>)} */}

                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} sm={6} style={{ padding: "15px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <Stack spacing={3}>
                                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                    <DesktopDatePicker
                                                        label="Start Date"
                                                        inputFormat="MM/DD/YYYY"
                                                        value={startDate}
                                                        name="start_date"
                                                        id="start_date"
                                                        onChange={e => {
                                                            setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                                                        }}
                                                        // onChange={handleChange}
                                                        // value={values.start_date}
                                                        renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'none', sm: 'block' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                                    />
                                                    {/* {Object.keys(errors => errors.start_date.length > 0) && (
                                                        <FormHelperText sx={{ color: "#db3700", display: { xs: 'none', sm: 'block' } }}>{errors.start_date}</FormHelperText>)} */}
                                                </Box>

                                                {/* // style to hide page in small screem material ui */}
                                                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                                    <MobileDatePicker
                                                        label="Start Date"
                                                        value={startDate}
                                                        inputFormat="MM/DD/YYYY"
                                                        name="start_date"
                                                        id="start_date"
                                                        onChange={e => {
                                                            setEndDate(moment(e.$d).format('YYYY-MM-DD'))
                                                        }}
                                                        renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                                    />
                                                    {/* {Object.keys(errors => errors.start_date.length > 0) && (
                                                        <FormHelperText sx={{ color: "#db3700", display: { xs: 'block', sm: 'none' } }}>{errors.start_date}</FormHelperText>)} */}
                                                </Box>

                                            </Stack>
                                        </LocalizationProvider>

                                    </Grid>

                                    <Grid xs={12} sm={6} style={{ padding: "15px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="End Date"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={endDate}
                                                    name="end-date"
                                                    id="end-date"
                                                    onChange={e => {
                                                        setEndDate(moment(e.$d).format('YYYY-MM-DD'))
                                                    }}
                                                    renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'none', sm: 'block' } }} style={{ marginTop: "15px" }} />}
                                                />
                                                {/* {Object.keys(errors => errors.end_date.length > 0) && (
                                                        <FormHelperText sx={{ color: "#db3700", display: { xs: 'none', sm: 'block' } }}>{errors.end_date}</FormHelperText>)} */}
                                                {/* // style to hide page in small screem material ui */}
                                                <MobileDatePicker
                                                    label="End Date"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={endDate}
                                                    name="end-date"
                                                    id="end-date"
                                                    onChange={e => {
                                                        setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                                                    }}
                                                    renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px" }} />}
                                                />

                                                {/* {Object.keys(errors => errors.end_date.length > 0) && (
                                                    <FormHelperText sx={{ color: "#db3700", display: { xs: 'block', sm: 'none' } }}>{errors.end_date}</FormHelperText>)} */}
                                            </Stack>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid xs={12} sm={6} style={{ marginTop: "15px", marginX: "2px" }}>
                                        <AutoComplete addressData={handleMapsData} />
                                    </Grid>
                                    <Grid xs={12} sm={6} style={{ marginTop: "15px" }}>
                                        <FileInputReal getfile={getfile} title={"Project Image"} />
                                    </Grid>
                                    <Grid xs={12}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            name="description"
                                            id="description"
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data)
                                            }}

                                        />

                                    </Grid>
                                    {fieldarr && fieldarr.map((field, index) => {
                                       
                                        return (


                                            <Grid xs={12} sm={6} style={{ marginTop: "15px", marginX: "1px" }}>
                                                {field.type == "select" ? (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name={`${field.id}`}
                                                            label={field.name}
                                                            onChange={(event) => {
                                                                // console.log(event)
                                                                debouncedChangeHandler (event, index)
                                                            }}
                                                       
                                                        >
                                                            {field.option.map((data, index) => (
                                                                <MenuItem value={data}>{data}</MenuItem>
                                                            ))}

                                                            {/* <MenuItem value={20}>Twenty</MenuItem>
                                                      <MenuItem value={30}>Thirty</MenuItem> */}
                                                        </Select>
                                                    </FormControl>
                                                ) : field.type == "file" ? (
                                                    <FileInputReal getfile={getfile} />
                                                ) : (

                                                    <TextField
                                                        type={field.type}
                                                        label={field.name}
                                                        name={`${field.id}`}
                                                        id={`${field.id}`}
                                                        onChange={(event) => debouncedChangeHandler(event, index)}
                                                        required
                                                        variant="outlined"
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: <Delete color="error" onClick={() => {

                                                                deleteDynamic(field)
                                                            }
                                                            } />
                                                        }}
                                                    />)
                                                }

                                            </Grid>
                                        )
                                    })}
                                    {/* {del && removedidx && removedidx.map((field, index) => {
                                        console.log("field array reaches here", fieldarr)
                                        return (

                                            <Grid xs={12} sm={6} style={{ marginTop: "15px", marginX: "1px" }}>
                                                <TextField
                                                    type={field.type}
                                                    label={field.name}
                                                    name={`${field.id}`}
                                                    id={`${field.id}`}
                                                    onChange={(event) => handleChangeFields(event, index)}
                                                    required
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <Delete color="error" onClick={()=>{
                                                       
                                                            deleteDynamic(field)
                                                        }
                                                        } />
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    })} */}
                                </Grid>

                                <LoadingButton

                                    type="submit"
                                    size="medium"
                                    // color="#00a15d"
                                    style={{ backgroundColor: "#00a15d", color: "#fff", float: "right", margin: "10px" }}
                                    onClick={Submit}
                                    // disabled={dirty && isValid  ? false : true}
                                    //    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="contained"
                                >
                                    Save
                                </LoadingButton>

                            </Form>
                        )}
                    </Formik>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <DynamicFields getDynamicProps={getDynamicProps} field={fieldId} del={del} />
            </Grid>

        </Grid>
    )
}
