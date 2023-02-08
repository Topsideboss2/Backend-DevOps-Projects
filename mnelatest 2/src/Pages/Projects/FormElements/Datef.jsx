import { TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'

export default function Datef({field}) {
    console.log("test",field)
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Stack spacing={3}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DesktopDatePicker
                            label={field.name}
                            inputFormat="MM/DD/YYYY"
                            value={startDate}
                            name={field.name}
                            id={field.id}
                            // onChange={e => {
                            //     setStartDate(moment(e.$d).format('YYYY-MM-DD'))
                            // }}
                         
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'none', sm: 'block' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                        />
                       
                    </Box>

                    {/* // style to hide page in small screem material ui */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MobileDatePicker
                            label={field.name}
                            inputFormat="MM/DD/YYYY"
                            value={startDate}
                            name={field.name}
                            id={field.id}
                            // onChange={e => {
                            //     setEndDate(moment(e.$d).format('YYYY-MM-DD'))
                            // }}
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ display: { xs: 'block', sm: 'none' } }} style={{ marginTop: "15px", marginRight: "5px" }} />}
                        />
                        
                    </Box>

                </Stack>
            </LocalizationProvider>

        </div>
    )
}
