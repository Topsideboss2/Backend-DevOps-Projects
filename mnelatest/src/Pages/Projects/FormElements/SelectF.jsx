import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import FormContext from '../../../context/DynamicFormContext'
import { Delete } from '@mui/icons-material'

export default function SelectF({ field }) {
    const{ processChange,deleteDynamic}=useContext(FormContext)
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{field.name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={`${field.id}`}
                    label={field.name}
                    onChange={(event) => processChange(field.id, event)}
                    InputProps={{
                        endAdornment: <Delete color="error" onClick={() => {
                          
                            deleteDynamic(field)
                        }
                        } />
                    }}
                 

                >
                    {field.option.map((data, index) => (
                        <MenuItem value={data}>{data}</MenuItem>
                    ))}

                   
                </Select>
            </FormControl>
        </div>
    )
}
