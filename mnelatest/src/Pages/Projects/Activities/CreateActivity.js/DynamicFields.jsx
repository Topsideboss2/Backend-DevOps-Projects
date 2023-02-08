import { Card, CardContent, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetDynamicFieldAction from '../../../../Redux/Actions/Settings/GetDynamicFields'

export default function DynamicFields({getDynamicProps,field,del}) {
    const [fieldarr, setFieldarr] = useState([])
    const [inputFields, setInputFields] = useState([])
    const dispatch = useDispatch()
    const [deleteState,setDeleteState]=useState(false)
    const fields = useSelector(state => state.dynamicField.data)??[]
    const [removedidx,setRemovedIdx]=useState([])
  

    const handleFieldArr = (data,index) => {
       
    getDynamicProps(data)
    deleteDynamic(data)

}


const deleteDynamic=(idd)=>{
        setDeleteState(true)
        const objWithIdIndex =inputFields.findIndex((obj) => obj.id === idd.id);
       
        if (objWithIdIndex > -1) {
            inputFields.splice(objWithIdIndex, 1);
        }
        
        setRemovedIdx(inputFields)
      
       
   
 
}
// const DeletedVal = useCallback(() => {
//     setInputFields((t) => [...t, field]);
//   }, [field]);
const addDynamicProps = (child) => {
    setFieldarr(prev => [...prev, field])
    
    return fieldarr

}
console.log("fiehhdgg",fields)
useEffect(() => {
    dispatch(GetDynamicFieldAction())
     
    setInputFields(fields)


}, [])
useEffect(() => {
    setDeleteState(del)
}, [del])
return (
    <Card>
        <div class="card-header">
            <Typography class="text-capitalize text-center"
             variant="h6" style={{ fontSize: "1.0rem", color: "#00a15d" }}>Select  dynamic field</Typography>

        </div>
        <CardContent>
            {!deleteState && fields?.map((fieldss, index) => (
                <div class="list-group">
                    <ul><li onClick={() => {
                        handleFieldArr (fieldss,index)
                    }}><a
                        class="list-group-item list-group-item-action ">{fieldss.name}</a>
                    </li>
                    </ul>

                </div>
            ))}
              {deleteState && fields?.map((fieldss, index) => (
                <div class="list-group">
                    <ul><li onClick={() => {
                        handleFieldArr (fieldss,index)
                    }}><a
                        class="list-group-item list-group-item-action ">{fieldss.name}</a>
                    </li>
                    </ul>

                </div>
            ))}
            


        </CardContent>
    </Card>
)
}
