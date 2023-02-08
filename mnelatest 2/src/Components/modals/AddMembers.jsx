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
import { Add } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GetRoleAction from '../../Redux/Actions/UserManagement/GetRoles';
// import Select from 'react-select'
import { Oval } from 'react-loader-spinner';
import InviteMemberAction from '../../Redux/Actions/UserManagement/InviteMember';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SetupRoleAction from '../../Redux/Actions/UserManagement/createRole';
import GetRoles from '../../Utils/Hooks/GetRoles';

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

export default function AddMembers({ roles }) {
    console.log("roles", roles)
    const [open, setOpen] = React.useState(false);
    // const [roles, setRoles] = React.useState([])
    const [role, setRole] = React.useState("")
    const [roleN, setRoleN] = React.useState("")
    const dispatch = useDispatch()
    const userRoles = useSelector(state => state.userRoles.data)
    const rolep=useSelector(state => state)
   
  
    const invitedMember =useSelector(state => state.invitedMember.data)
    const loading = useSelector(state => state.invitedMember.loading)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log("rooooole",loading)
    React.useEffect(() => {
        dispatch(GetRoleAction())
    }, [])


    return (
        <div>

            <Button variant="outlined" startIcon={<Add />} style={{ color: "#00a15d" }} size="large" onClick={handleClickOpen}>Invite Member</Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Invite New Members
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Formik
                        initialValues={{
                            "email": "",
                            "role":""


                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),



                        })}
                        onSubmit={(values, { resetForm }) => {
                            console.log("role reached here", role)
                            values["role_id"] = role
                            dispatch(InviteMemberAction(values))
                          
                            // resetForm({ values: "" })
                            console.log("submit values", values)
                        }}
                    >
                        {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                            <Form>
                                <div class="">
                                    <div class="mb-3">
                                        <label class="mb-1"><strong>Email</strong></label>
                                        <TextField
                                            variant='outlined'
                                            type="email"
                                            fullWidth
                                            name='email'
                                            id='email'
                                            onChange={handleChange}
                                            value={values.email}

                                        />
                                        <div style={{ color: "red" }}>
                                            {errors.email}
                                        </div>
                                    </div>
                                    {/* <div class="mb-3 "  >
                                                <label class="col-lg-4 col-form-label" for="validationCustom04">Assign  A Role
                                                </label>
                                                <Select
                                                    onChange={(e) => {
                                                        setRole(e)
                                                    //    setRoleN(e.label)
                                                        }}
                                                    options={roles}
                                                    value={roleN}
                                                />
                                            </div> */}
                                    <FormControl fullWidth>
                                        <InputLabel
                                         id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            label="Role"
                                            name="role"
                                            onChange={e=>setRole(e.target.value)}
                                        >
                                           { console.log("userrole",userRoles)}
                                            {userRoles.map((role,index)=>(
                                                <MenuItem key="index" value={role.id}>{role.name}</MenuItem>
                                            ))}
                                            
                                        
                                        </Select>
                                    </FormControl>
                                </div>

                                <DialogActions>
                                    {/* <div class="modal-footer" style={{ display: "flex" }}> */}
                                    <div className="text-center mt-4">
                                        <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" onClick={handleClose} >Close</button>
                                    </div>
                                    <div className="text-center mt-4">
                                        {loading && (
                                            <button type="submit" disabled className="btn btn-primary "  >
                                                <div style={{ display: "flex", flexDirection: "row", paddingLeft: "30px" }}>

                                                    <Oval height="20"
                                                        width="20"
                                                        color='white'
                                                        ariaLabel='loading' />
                                                    <p style={{ marginLeft: "30px" }}>adding...</p>
                                                </div>

                                            </button>

                                        )}
                                        {!loading && (
                                            <button type="submit"
                                                className="btn btn-primary btn-light-color " disabled={dirty && isValid ? false : true}
                                            >invite member</button>
                                        )}


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