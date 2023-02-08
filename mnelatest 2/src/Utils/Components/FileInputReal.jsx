import { Article, CloudUploadOutlined, PictureAsPdf } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./file.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

export default function FileInputReal({getfile,title}) {
  console.log("title",title)
    const [file,setFile]=useState("")
    const [fileName,setFileName]=useState("")
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        getfile(e.target.files[0])
        setFileName(prev=>[...prev,e.target.files[0].name])
        console.log(fileName.length)
  
    }
    return (
  <>
   <Button variant="outlined" component="label" style={{color:"#00a15d",border: "0.0625rem solid #d5d5d5" ,width:"100%",height:"53.33px"}} >
        {" "}
        <CloudUploadIcon style={{margin:"0.5rem"}}  /> {fileName.length === 0?`Upload a ${title}`:file.name}
        <input style={{margin:"0.5rem"}} type="file" hidden onChange={(e)=>handleFileChange(e)} />
      </Button>
  </>
    )
}
