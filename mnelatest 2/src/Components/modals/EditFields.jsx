import * as React from 'react';
import * as Yup from "yup"
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import "../../Assets/styles/styles.css"
import SaveIcon from '@mui/icons-material/Save';
import { Add, Edit } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GetRoleAction from '../../Redux/Actions/UserManagement/GetRoles';
import { Oval } from 'react-loader-spinner';
import { createTheme } from '@mui/system'
import InviteMemberAction from '../../Redux/Actions/UserManagement/InviteMember';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import UpdateDynamicFieldAction from '../../Redux/Actions/Settings/UpdateDynamicFields';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EditField({id}) {
    const [open, setOpen] = React.useState(false);
    const [fieldType,setFieldType]=React.useState()
    const [name,setName]=React.useState()
    const dispatch = useDispatch()
   
    const loading = useSelector(state => state.updatedDynamicField.loading)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitData=()=>{
        const data={
            name:name,
            type:fieldType
        }
        dispatch(UpdateDynamicFieldAction(data,id))
        console.log("updated",data)
    }
    React.useEffect(() => {
        // dispatch(GetRoleAction())
        // userRoles.map((membermap) => {
        //     setRoles(oldarray => [...oldarray, { value: membermap.id, label: membermap.name }])

        // })
        // console.log("roles", roles)
    }, [])


    return (
        <div>

            <Edit onClick={handleClickOpen} style={{color:"#00a15d"}} />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Update Dynamic Fields
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Formik
                        initialValues={{
                            "name": "",


                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),



                        })}
                        onSubmit={(values, { resetForm }) => {
                            
                            values["type"] = fieldType
                            dispatch(UpdateDynamicFieldAction(values))
                            resetForm({ values: "" })
                            console.log("submit values", values)
                        }}
                    >
                        {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                            <Form>
                                <div class="">
                                    <TextField id="outlined-basic"
                                        label="Field Name"
                                        variant="outlined"
                                        name="name"
                                        style={{ marginBottom: "15px" }}
                                        onChange={(e)=>setName(e.target.value)}
                                        value={name}
                                        fullWidth />
                                    <FormControl fullWidth style={{ marginBottom: "15px" }}>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="type"
                                            label="Age"
                                        onChange={event => setFieldType(event.target.value)}
                                        value={fieldType}
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
                                </div>

                                <DialogActions>
                                    {/* <div class="modal-footer" style={{ display: "flex" }}> */}
                                    <div className="text-center mt-4">
                                    <Button
                                            size="medium"
                                            color="error"
                                            data-bs-dismiss="modal"
                                            onClick={handleClose}
                                            // onClick={handleClick}
                                            // disabled={dirty && isValid && !loading ? false : true}
                                            
                                            loadingPosition="start"
                                            startIcon={<CloseIcon />}
                                            variant="outlined"
                                        >
                                         Close
                                        </Button>
                                        {/* <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" onClick={handleClose} >Close</button> */}
                                    </div>
                                    <div className="text-center mt-4">
                                            
                                        <LoadingButton
                                       
                                        type="button"
                                            size="medium"
                                            // color="#00a15d"
                                            style={{backgroundColor:"#00a15d",color:"#fff"}}
                                            onClick={()=>handleSubmitData()}
                                            // disabled={dirty && isValid  ? false : true}
                                            loading={loading}
                                            loadingPosition="start"
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                        >
                                            Save
                                        </LoadingButton>


                                    </div>
                                    {/* </div> */}
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>


                {/*  */}
            </BootstrapDialog>
        </div>
    );
}