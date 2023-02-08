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
import "../../../Assets/styles/styles.css"
import { Add, Save } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GetRoleAction from '../../../Redux/Actions/UserManagement/GetRoles';
// import Select from 'react-select'
import { Oval } from 'react-loader-spinner';
import InviteMemberAction from '../../../Redux/Actions/UserManagement/InviteMember';
import { FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import SetupRoleAction from '../../../Redux/Actions/UserManagement/createRole';
import GetCompanyUserAction from '../../../Redux/Actions/Users/GetUsersAction';
import AddProjectMemberAction from '../../../Redux/Actions/Projects/ProjectMember';
import { LoadingButton } from '@mui/lab';
import Select from 'react-select';
import Debounce from '../../../Utils/Components/Debounce';

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

export default function AddProjectMembers({ projectId }) {

    const [open, setOpen] = React.useState(false);
    const [member ,setMember]=React.useState([])
    const [user, setUser] = React.useState([])
    const [userr, setUserr] = React.useState([])
    const dispatch = useDispatch()
    const companyMembers=useSelector(state=>state.companyUsers.data)??[]
    const companyMembersloading=useSelector(state=>state.companyUsers.loading)??false
    const loading = useSelector(state => state.addProjectMember.loading)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const  handleChange=(e)=>{
        setUser(e.target.value)
    }

    const handleSubmit=()=>{
        member.map((mem)=>{
            setUserr(prev=>[...prev,mem.value])
        })
        console.log("userr",userr)
        let data={
           
            
        }
        data.project_id=projectId
        data.user_id=user
        dispatch(AddProjectMemberAction(data))
    }
    const processChange = Debounce(() => handleSubmit());
    React.useEffect(() => {
        dispatch(GetCompanyUserAction())
        companyMembers?.map((member) => {
            setUser(oldarray => [...oldarray,  member.user_id])
  
        })
        console.log("seeet",user)
        
    }, [])


    return (
        <div>

            <Button variant="outlined" startIcon={<Add />} 
            style={{ color: "#00a15d" }} size="large" onClick={handleClickOpen}>Invite Project Member</Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Invite Project Members
                </BootstrapDialogTitle>
                <DialogContent dividers>
    
                            <form>
                                <div class="">
                              
                                    <FormControl fullWidth>
                                    <label class="col-lg-4 col-form-label" for="validationCustom04">select a member
                                    </label>
                                  { console.log("user",user)}
                                    <Select
                                       
                                        isMulti
                                        name="user_id"
                                        options={user}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(e) => {
                                           e.map((mem)=>{
                                                setUserr(prev=>[...prev,mem.value])
                                            })
                                     setMember(e)
                                     console.log("user",user)
                                        }}
                                    />
                                    </FormControl>
                                </div>

                                <DialogActions>
                                    {/* <div class="modal-footer" style={{ display: "flex" }}> */}
                                    <div className="text-center mt-4">
                                        <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" onClick={handleClose} >Close</button>
                                    </div>
                                    <div className="text-center mt-4">
                                     
                                    <LoadingButton
                                type="button"
                                size="medium"
                                // color="#00a15d"
                                style={{ backgroundColor: "#00a15d", color: "#fff" }}
                                onClick={()=> processChange() }
                                // disabled={dirty && isValid  ? false : true}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<Save />}
                                variant="contained"
                            >
                                Save
                            </LoadingButton>

                                    </div>
                                    {/* </div> */}
                                </DialogActions>
                            </form>
                       
                </DialogContent>


                {/*  */}
            </BootstrapDialog>
        </div>
    );
}