import { useState, useEffect } from "react"
import * as Yup from "yup"
// import { requests } from "../../services/Api";
// import { getToken } from "../../services/useToken";
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Add, AddCircleOutline, AddOutlined, Close, Delete, DeleteOutline, DeleteOutlineOutlined, Save } from "@mui/icons-material";
import { LocalStorage } from "../../../Utils/Hooks/useLocalStorage";
import { requests } from "../../../Utils/Services/Api";
import { Button, CardHeader, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CreateDynamicFieldAction from "../../../Redux/Actions/Settings/CreateDynamicField";
import { LoadingButton } from "@mui/lab";
import GetReportTypeAction from "../../../Redux/Actions/Settings/Reports/GetReportTypeAction";
import GetDynamicFieldAction from "../../../Redux/Actions/Settings/GetDynamicFields";
import CreateDynamicReportAction from "../../../Redux/Actions/Settings/CreateDynamicReport";
import MultiselectField from "../../../Utils/Components/Multiselect";
// import { BsPlusCircleFill, BsTrashFill } from "react-icons/bs";


function AddReport({ newDynamicField }, props) {
    const [fieldid, setFieldId] = useState()
    const [selOperation, setSelOperation] = useState()
    const [idx, setIdx] = useState()
    const [reportType, setReportType] = useState()
    const [reportName, setReportName] = useState()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.createDynamicField.loading)
    const createdReport = useSelector(state => state.createDynamicReport.data)
    const reportTypeg = useSelector(state => state.reportType.data)
    const loadingReport = useSelector(state => state.reportType.loading)
    const dynamicfields = useSelector(state => state.dynamicField.data) ?? []
    const [personName, setPersonName] = useState([]);
    const [report, setReport] = useState([]);

    const navigate = useNavigate()
    const token = LocalStorage("token")
    const [test, setTest] = useState([{ field_id: "", operation: "" }])
    const [arr, setArr] = useState([])

    const operation = [
        { value: 'sum', label: 'Total' },
        { value: 'count', label: 'Total count' },
        { value: 'avg', label: 'Average' },
        { value: 'min', label: 'minimum' },
        { value: 'max', label: 'maximum' }
    ]

    // add branch
    const addBranch = (e) => {
        let temp = { ...test };
        console.log("temp", temp)
        // temp.branches.push({ field_id: "", operation: "" });
        // setTest(temp);
        setTest((prev) => [...prev, temp])
        console.log("temp test", test)
    };
    const deleteBranch = (e, i) => {
        let temp = [...test]
        console.log("temp delete", temp)
        temp.splice(i, 1)
        setTest(temp)
    }
    const addOption = (e, i) => {
        let temp = { ...test };
        temp.branches[i].option.push('');
        setTest(temp);
    };

    // branch handle
    const handleFieldChange = (e, i) => {
        let temp = { ...test }
        temp[i].field_id = e


    }

    const handleOperationChange = (e, i) => {
        let temp = { ...test }
        temp[i].operation = e

    }


    const handleChange = (event) => {

        const {
            target: { value }
        } = event;
        setReport((prev) => ([...prev, event.target]));

        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );

        console.log(report);
    };



    // post data
    const postCompanyConfig = async () => {


        const data = {
            name: reportName,
            report_type: reportType,
            fields: test
        }

        dispatch(CreateDynamicReportAction(data))
        newDynamicField(createdReport)
        // window.location.reload()


    }
    const reports = (childData) => {
        setArr(childData)
    }

    // handle submit
    // const submit = e => {
    //     const 

    //     postCompanyConfig(data)
    // }

    useEffect(() => {
        dispatch(GetDynamicFieldAction())
        dispatch(GetReportTypeAction())
    }, [])


    return (

        <div class="m-4 d-flex justify-content-center flex-column">
            <CardHeader title="Add A Report" />
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


                    <Form class=" " onSubmit={postCompanyConfig} novalidate>

                        <>
                            <TextField id="outlined-basic"
                                sx={{ m: 1 }}
                                variant="outlined"
                                label="Report  Name"
                                fullWidth
                                name="report_name"
                                onChange={(e) => setReportName(e.target.value)}
                                value={reportName} />
                            <FormControl fullWidth sx={{ m: 1 }}>
                                {/* <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Report Type</label> */}
                                <InputLabel htmlFor="age-native-simple">
                                    Select Report Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={reportType}
                                    label="Age"
                                    onChange={(e) => {
                                        setReportType(e.target.value)
                                    }}
                                >
                                    {!loadingReport && reportTypeg?.map((reporttype, index) => (
                                        <MenuItem key={index} value={reporttype.id} class="text-capitalize">{reporttype.name}</MenuItem>

                                    ))}

                                </Select>
                            </FormControl>
                            {console.log("testttt", test.length)}
                            {test && test.map((testt, indexx) => (
                                <div key={indexx}>

                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        {/* <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Dynamic fields</label> */}
                                        <InputLabel id="demo-simple-select-label" shrink={true}>Dynamic Fields</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"

                                            label="Select Field"
                                            onChange={(e) => handleFieldChange(e.target.value, indexx)}
                                        >
                                            {dynamicfields.map((field, index) => (
                                                <MenuItem key={index} value={field.id}>{field.name}</MenuItem>
                                            ))}


                                        </Select>
                                        {/* < MultiselectField array={dynamicfields} /> */}
                                    </FormControl>

                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="age-native-simple">
                                            Select Operation
                                        </InputLabel>
                                        {/* <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Operation</label> */}
                                        {/* <InputLabel id="demo-simple-select-label" shrink={true}>Age</InputLabel> */}
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            //  value={selOperation}
                                            label="Operation"
                                            onChange={e => handleOperationChange(e.target.value, indexx)}
                                        >
                                            {operation.map((operation, index) => (
                                                <MenuItem value={operation.value} class="text-capitalize">{operation.label}</MenuItem>
                                            ))}


                                        </Select>
                                    </FormControl>

                                    {test.length > 1 &&
                                        (<DeleteOutlineOutlined fontSize="medium" class="btn-danger light" onClick={(event) => deleteBranch(event, indexx)} style={{ right: "0", marginLeft: "85%" }} />
                                        )}

                                </div>


                            ))}
                            <Add fontSize="medium" onClick={(e) => addBranch(e)} />

                        </>


                        <Box style={{ display: "flex", justifyContent: "flex-end", margin: "15px" }}>
                            {/* <Add fontSize="medium" onClick={addBranch} class="btn light btn-dark">Add fields</Button> */}
                            <LoadingButton
                                type="button"
                                size="medium"
                                // color="#00a15d"
                                style={{ backgroundColor: "#00a15d", color: "#fff" }}
                                onClick={postCompanyConfig}
                                // disabled={dirty && isValid  ? false : true}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<Save />}
                                variant="contained"
                            >
                                Save
                            </LoadingButton>

                        </Box>
                    </Form>
                )}

            </Formik>

        </div>

    )
}

export default AddReport;