import { Delete } from '@mui/icons-material'
import { FormHelperText, TextField } from '@mui/material'
import React, { useContext } from 'react'
import FormContext from '../../../context/DynamicFormContext'

export const Inputf = ({field}) => {
    const{ processChange,deleteDynamic}=useContext(FormContext)
    console.log("deleettee",field)
    return (
        <div style={{ margin:"3px" }}>
          
            <TextField
                type={field.type}
                label={field.name}
                name={`${field.id}`}
                id={`${field.id}`}
                onChange={(event) => processChange(field.id, event)}
                required
                multiline
                maxRows={field.type==="textarea"?2:1}
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: <Delete color="error" onClick={() => {
                      
                        deleteDynamic(field)
                    }
                    } />
                }}
            />
            <FormHelperText>Enter a {field.type}</FormHelperText>
        </div>
    )
}
