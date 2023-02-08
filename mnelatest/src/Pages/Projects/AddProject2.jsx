import { Box, Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Formik } from 'formik';
import moment from 'moment';
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
import Elements from './FormElements/Elements';
import FormContext from '../../context/DynamicFormContext';
import { useNavigate } from 'react-router-dom';


export default function AddProject() {
    const navigate = useNavigate()
    const [description, setDescription] = useState()
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [address, setAddress] = useState()
    const [title, setTitle] = useState("")
    const [projectImage, setProjectImage] = useState()
    const [fieldarr, setFieldArr] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [del, setDel] = useState(false);
    const [fieldId, setFieldID] = useState()
    const [member, setMember] = useState([])
    const [location, setLocation] = useState("")
    const loading = useSelector(state => state.createdProject.loading)
    const dispatch = useDispatch()
    const companyMembers = useSelector(state => state.companyUsers.data)

    const handleMapsData = (childData, location) => {
        setAddress(childData)
        setLocation(location)
    }

    const getfile = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setProjectImage(reader.result)

        };
        reader.onerror = function (error) {
        };
    }
    const getDynamicProps = (child) => {
        setFieldArr(prev => [...prev, child])
    }

    const deleteDynamic = (idd) => {
        setDel()
        const objWithIdIndex = fieldarr.findIndex((obj) => obj.id === idd.id);
        if (objWithIdIndex > -1) {
            fieldarr.splice(objWithIdIndex, 1);
        }
        setFieldArr(fieldarr)
        setFieldID(idd)
    }

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const handleDynamicChange = (fid, event) => {
        for (let i = 0; i < fieldarr.length; i += 1) {
            if (fid === fieldarr[i].id) {
                fieldarr[i].value = event.target.value
                const result = fieldarr.flat().map(({ id, value }) => Object.fromEntries([[id, value]]));
                setInputFields(result)

            }
        }
    }
    const processChange = debounce((id, event) => handleDynamicChange(id, event));

    const Submit = () => {
        const project = {
            title: title,
            start_date: startDate,
            end_date: endDate,
            user_id: member,
            // project_image:projectImage,
            description: description,
            latitude: address.lat,
            location: location,
            longitude: address.lng,
            data: [...inputFields]
        }
        dispatch(CreateProjectsAction(project, navigate))



    }

    useEffect(() => {
        dispatch(GetCompanyUserAction())
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <FormContext.Provider
                    value={{ processChange ,deleteDynamic}}
                >
                    <Card sx={{ p: 4 }}>
                        <Typography class="text-capitalize text-center" variant="h6" style={{ fontSize: "1.25rem", color: "#00a15d" }}>Create a project</Typography>
                        <form>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Name"
                                        name="title"
                                        id={Object.keys(errors => errors.title.length > 0) ? "outlined-error-helper-text" : "title"}
                                        fullWidth
                                        onChange={e => setTitle(e.target.value)}
                                        value={title}
                                        required />
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
                                                    renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'none', sm: 'block' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                                />
                                            </Box>

                                            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                                <MobileDatePicker
                                                    label="Start Date"
                                                    value={startDate}
                                                    inputFormat="MM/DD/YYYY"
                                                    name="start_date"
                                                    id="start_date"
                                                    onChange={e => {
                                                        setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                                                    }}
                                                    renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                                />
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
                                            <MobileDatePicker
                                                label="End Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={endDate}
                                                name="end-date"
                                                id="end-date"
                                                onChange={e => {
                                                    setEndDate(moment(e.$d).format('YYYY-MM-DD'))
                                                }}
                                                renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px" }} />}
                                            />
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
                                        data="<p>dd a description</p>"
                                        name="description"
                                        id="description"
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}

                                    />

                                </Grid>
                                {fieldarr && fieldarr.map((field, index) => {
                                    return (
                                        <Grid xs={12} sm={6} style={{ marginTop: "15px", paddingX: "3px" }}>
                                            <Elements field={field} />
                                        </Grid>
                                    )
                                })}

                            </Grid>

                            <LoadingButton
                                type="submit"
                                size="medium"
                                style={{ backgroundColor: "#00a15d", color: "#fff", float: "right", margin: "10px" }}
                                onClick={Submit}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<Save />}
                                variant="contained"
                            >
                                Save
                            </LoadingButton>

                        </form>
                    </Card>
                </FormContext.Provider>
            </Grid>
            <Grid item xs={12} sm={4}>
                <DynamicFields getDynamicProps={getDynamicProps} field={fieldId} del={del} />
            </Grid>

        </Grid>
    )
}
