

import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'

export default function EditComponent({handleClose,newarr,editfunc}) {
  return (
    <Card>
        <Box style={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h6" sx={{color:"#5927e3",alignItem:"center",mb:1}} >Add a Sector</Typography>
        </Box>
        {/* <Typography variant="h6" sx={{color:"#5927e3",alignItem:"center",mb:1}} >Add a Sector</Typography> */}
        <CardContent>
            <form>
            <TextField id="outlined-basic" label="Sector Name" variant="outlined"sx={{mb:1}}  fullWidth />
            <TextField id="outlined-basic" label="Description" variant="outlined"
             multiline minRows={4}  sx={{mb:1}}  fullWidth/>

            </form>
        </CardContent>
        <CardActions style={{display:"flex",justifyContent:"flex-end"}}>
            <Button variant="contained" onClick={()=>newarr()} sx={{backgroundColor:"#00a15d", color:"fff"}}>update</Button>
            <Button variant="outlined" onClick={()=>handleClose()} style={{color:"error" }}>Close</Button>
        </CardActions>
    </Card>
  )
}