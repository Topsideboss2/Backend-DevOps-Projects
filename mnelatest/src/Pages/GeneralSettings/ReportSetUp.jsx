import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import "../../Assets/styles/styles.css"


export default function ReportSetup() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div class="card">
        <div class="card-header">
            <h4 class="card-title">system infomation</h4>
        </div>
        <div class="card-body">
            <div class="basic-form ">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Report Name</label>

                    <TextField id="outlined-basic"  variant="outlined" fullWidth  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Report Type</label>
                        {/* <InputLabel id="demo-simple-select-label" shrink={true}>Age</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <label class="col-sm-3 col-form-label text-capitalize sub-sub-t">Fields</label>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <label class="col-sm-3 col-form-label text-capitalize sub-sub-t"></label>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
        </div>
        </div>
        </div>
    );
}