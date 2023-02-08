import { Button, InputLabel } from '@mui/material'
import React, { useContext } from 'react'
import FormContext from '../../../context/DynamicFormContext'

export default function FileF({field}) {
    const{ processChange}=useContext(FormContext)
    return (
        <div>
            <InputLabel>{field.name}</InputLabel>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    onChange={(event) => processChange(field.id, event)}
                    required

                    hidden
                />
            </Button>
        </div>
    )
}
