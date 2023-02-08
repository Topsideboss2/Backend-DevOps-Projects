import { Article, CloudUploadOutlined, PictureAsPdf } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
 
import CloseIcon from '@mui/icons-material/Close';


export default function FileInput() {
    const [file, setFile] = useState("")
    const current = new Date();
    // const year = current.getFullYear();
    // const month = current.toLocaleString('default', { month: 'short' });
    // // const month = current.toLocaleString('default', { month: 'short' });
    // const day = ("0" + current.getDate()).slice(-2);
    // const _date = ${month} ${day},${year};

    const handleIncomeExp = (e) => {
       
        setFile(e.target.files[0]);
        //setIsUpdating(true);
    }
    const removeSelectedImage = () => {
        setFile('');
    }
  return (
    <>
    <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h6" className="fmw-onboard-partner-label" style={{ marginBottom: '0.5rem' }}>Income and expenditure for 12 months</Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        !file ? (
                            <>
                                <div style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    border: 'none',
                                    // border: '1px solid var(--color-primary-light)',
                                    width: '337px',
                                    height: '50px'
                                }}>
                                    <label className='' style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                                        <div className='mb-2' style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#F7F7F7' }}>
                                            <div style={{ backgroundColor: '#A0A0A0', height: '100%', display: 'flex', alignItems: 'center', marginRight: '20px', width: '52px' }}>
                                                <CloudUploadOutlined sx={{ display: 'flex', fontSize: '27px', justifyContent: 'center', alignItems: 'center', mx: '12px', color: '#ffff', backgroundColor: '#A0A0A0 !important' }} />
                                            </div>
                                            <Typography variant="caption" className="upload-sub-label">
                                                Click here to upload
                                            </Typography>
                                        </div>
                                        <input
                                            type="file"
                                            name='file'
                                            // accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={handleIncomeExp}
                                            style={{ width: '0px', height: '0px' }}
                                        />

                                    </label>
                                </div>
                            </>
                        ) :(
                            <>
                                <div style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between',
                                    border: '1px solid var(--color-primary-light)',
                                    width: '337px',
                                    height: '55px'
                                }}>
                                    <div style={{ backgroundColor: '#A0A0A0', height: '100%', display: 'flex', alignItems: 'center', marginRight: '5px', width: '52px' }}>
                                        <span style={{ margin: "0px 6px" }}>
                                            {
                                                file.type === "application/pdf" ? (
                                                    <PictureAsPdf sx={{
                                                        fontSize: '40px',
                                                        color: 'red'
                                                    }} />
                                                ) : (
                                                    <Article sx={{
                                                        fontSize: '40px',
                                                        color: '#1976d2'
                                                    }} />
                                                )
                                            }

                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                        <Typography component="h6" className="fmw-upload-typography">
                                            {/* {subString(file.name, 25)} */}
                                        </Typography>


                                        {/* <Typography variant="caption" className="upload-sub-label">
                                            uploaded on  {_date}
                                        </Typography> */}

                                        {/* <img src={data:${name};base64,${fileArr}} alt="jobu" /> */}
                                        {/* { fileArr && <>{fileArr}</>} */}
                                    </div>

                                    <div>
                                        <IconButton
                                            aria-label="close"
                                            onClick={removeSelectedImage}
                                            sx={{
                                                color: (theme) => theme.palette.grey[500], mr: '6px'
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                        )
                        }
                        </Grid>
                        </Grid>
                        </>

  )
}
