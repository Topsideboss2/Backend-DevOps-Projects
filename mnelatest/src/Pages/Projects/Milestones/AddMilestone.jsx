import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Save } from '@mui/icons-material';
import { DialogActions, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/system';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import CompanyUsers from '../../../context/GetUsersContext';
import { useDispatch, useSelector } from 'react-redux';
import CreateMilestonesAction from '../../../Redux/Actions/Milestones/AddMilestones';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #00a15d',
    boxShadow: 24,
    overflow:"scroll",
    p: 4,
};

export default function AddMilestone({handleAddedMilestone}) {
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.addMilestone.loading)
    const addedMilestone=useSelector(state=>state.addMilestone.data)
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData]=useState({})
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [description, setDescription] = React.useState("")
    const users=CompanyUsers()
    const {id}=useParams()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          "project_id":id,
          [name]: value,
          "start_date":startDate,
          "due_date":endDate,
          "summary":description

        }));
        console.log("formData",description)
      };
      const postMilestone=()=>{
        const data={
            ...formData,
            "summary":description
        }
        dispatch(CreateMilestonesAction(data))
        handleAddedMilestone(addedMilestone,loading)
        
      }

    return (
        <div>
            <Button variant="outlined" startIcon={<Add />} style={{ color: "#00a15d" }} size="large" onClick={handleOpen}>Add Milestone</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{overflow:"scroll"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h6" class="text-center">
                        Add a Milestone
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                 fullWidth
                                  id="outlined-basic" 
                                  name="title"
                                  label="Milestone Title"
                                   variant="outlined"
                                   onChange={onInputChange} 
                                   />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Assign Member</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        
                                        label="Assign Member"
                                        onChange={onInputChange}
                                        name="user_id"
                                       
                                    >
                                        {users?.map((user,index)=>(
                                            <MenuItem value={user.user_id
                                            }>{user.user_name}</MenuItem>
                                        ))}
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6} style={{ paddingLeft: "15px" }}>
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
                                                    // setStartDate(e.$d)
                                                    setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                                                }}
                                               

                                                renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'none', sm: 'block' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                            />

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
                                                    // setStartDate(e.$d)
                                                    setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                                                }}
                                                renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                                            />
                                            {/* {Object.keys(errors => errors.start_date.length > 0) && (
                                                        <FormHelperText sx={{ color: "#db3700", display: { xs: 'block', sm: 'none' } }}>{errors.start_date}</FormHelperText>)} */}
                                        </Box>

                                    </Stack>
                                </LocalizationProvider>

                            </Grid>

                            <Grid xs={12} sm={6} style={{ paddingLeft: "15px" }}>
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
                            <Grid item xs={12} sm={12}>
                                <TextField type="number" name="estimated_cost" fullWidth id="outlined-basic" label="Estimated Cost" variant="outlined" onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
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
                                                console.log("data",data)
                                                setDescription(data)
                                               
                                            }}

                                        />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            {/* <div class="modal-footer" style={{ display: "flex" }}> */}
                            
                                <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" onClick={handleClose} >Close</button>
                                <LoadingButton
                                    type="button"
                                    size="medium"
                                    style={{ backgroundColor: "#00a15d", color: "#fff" }}
                                    onClick={postMilestone}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="contained"
                                >
                                    Save
                                </LoadingButton>
                          
                            {/* </div> */}
                        </DialogActions>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}