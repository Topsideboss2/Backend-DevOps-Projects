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
import "../../Assets/styles/styles.css"
import SaveIcon from '@mui/icons-material/Save';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import DeleteDynamicFieldAction from '../../Redux/Actions/Settings/DeleteDynamicField';

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

export default function DeleteField({handleDelete,id,deleteLoading}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
   
    const loading = useSelector(state => state.updatedDynamicField.loading)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
      
    }, [])


    return (
        <div>

            <Delete onClick={handleClickOpen} color="error" />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                   
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Typography variant="h6" class="text-cente">Are you sure you want to proceed?</Typography>
                  <Typography variant="paragraph" color="error">This action is irreversible !</Typography>
                </DialogContent>

               <DialogActions>
               <div className="text-center mt-4">
                                    <Button
                                            size="medium"
                                            style={{color:"#00a15d"}}
                                            data-bs-dismiss="modal"
                                            onClick={handleClose}

                                            startIcon={<CloseIcon />}
                                            variant="outlined"
                                        >
                                         Cancel
                                        </Button>
                                    </div>

                                    <div className="text-center mt-4">
                                            
                                            <LoadingButton
                                           
                                            type="button"
                                                size="medium"
                                                color="error"
                                                onClick={()=>handleDelete(id)}
                                                loading={deleteLoading}
                                                loadingPosition="start"
                                                startIcon={<Delete />}
                                                variant="contained"
                                            >
                                                Delete
                                            </LoadingButton>
    
    
                                        </div>
               </DialogActions>


                {/*  */}
            </BootstrapDialog>
        </div>
    );
}