
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import "../../../Assets/styles/styles.css"
import { Add, Delete, Save } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DynamicfieldSetting() {
  const [inputType, setInputType] = React.useState('');
  const [option, setOption] = React.useState([])
  const [selectType,setSelectType]=React.useState(false)
  const [name,setName]=React.useState()
  const [submitData,setSubmitData]=React.useState([])
  const [test,setTest]=React.useState({ branches: [{name: "",type: "",option: [""] }] })

  const handleChange = (e,i) => {
    if(e.target.value === 'select') {
      setOption(oldArray => [...oldArray, i])
  }
    // setInputType(event.target.value);
    
    e.target.value=="select" &&setSelectType(prev=>!prev)
  };

  const handleSubmit=()=>{
    const data={
     
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}sm={6} md={4}>
        <TextField id="outlined-basic" label="Filed Name" variant="outlined" onChange={(e)=>setName(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}sm={6} md={4}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={inputType}
    label="Input Type"
    onChange={handleChange}
  >
    <MenuItem value={"text"}>Text</MenuItem>
    <MenuItem value={"number"}>Number</MenuItem>
    <MenuItem value={"email"}>Email</MenuItem>
    <MenuItem value={"file"}>File</MenuItem>
    <MenuItem value={"textarea"}>Textarea</MenuItem>
    <MenuItem value={"password"}>Password</MenuItem>
    {/* <MenuItem value={"select"}>Select</MenuItem> */}
  </Select>
</FormControl>
        </Grid>
        <Grid item xs={12}sm={6} md={4}>
          <Box>
        <Button variant="outlined" size="large" style={{margin:"5px",color:"#00a15d",border:" 1px #00a15d solid"}} startIcon={<Add/>} >Add More</Button>
        <Button variant="contained" size='large' style={{margin:"5px", backgroundColor: "#00a15d", color:"#fff"}} startIcon={<Save/>}>Submit</Button>
          </Box>
        </Grid>
      {selectType &&(
        
        <Grid container item spacing={2}>
          <Grid item xs={6} 
    container
    direction="column"
    justify="flex-end"
    className="abc">
     <label>Enter your select values</label>
  </Grid>
  <Grid item xs={6} 
    container
    direction="column"
    justify="flex start"
    className="pqr">
     <label></label>
     </Grid>
          <Grid item xs={12}sm={6} md={4}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}sm={6} md={4}>
          <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={inputType}
      label="Input Type"
      onChange={handleChange}
    >
      <MenuItem value={"text"}>Text</MenuItem>
      <MenuItem value={"number"}>Number</MenuItem>
      <MenuItem value={"email"}>Email</MenuItem>
      <MenuItem value={"file"}>File</MenuItem>
      <MenuItem value={"textarea"}>Textarea</MenuItem>
      <MenuItem value={"password"}>Password</MenuItem>
      <MenuItem value={"select"}>Select</MenuItem>
    </Select>
  </FormControl>
          </Grid>
          <Grid item xs={12}sm={6} md={4}>
            <Box>
          <Button variant="outlined" size="large" style={{margin:"5px",color:"#00a15d",border:" 1px #00a15d solid"}} startIcon={<Add/>} >Add More</Button>
          <Button variant="contained" size='large' style={{margin:"5px", backgroundColor: "#00a15d", color:"#fff"}} startIcon={<Save/>}>Finish</Button>
          <IconButton aria-label="delete" onClick={(e)=>setSelectType(prev=>!prev)}>  <Delete  color="error"/></IconButton>
            </Box>
          </Grid>
          </Grid>
       
      )}
      </Grid>
      </form>
    </Box>
  );
}