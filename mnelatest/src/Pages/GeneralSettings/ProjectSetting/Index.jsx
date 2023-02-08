import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetDynamicFieldAction from '../../../Redux/Actions/Settings/GetDynamicFields.js'
import AddField from './AddField.jsx'
import ViewField from './ViewField.jsx'
import HandleAdded from '../../../Components/DataFeed/HandleAdded.js'
// import DynamicField from './ProjectSettings.jsx'


export default function ProjectSetting() {
  const [newarr,setNewarr]=useState([])
  const [adding,setAdding]=useState(false)
  const [addedArr,setAddedArr]=useState([])

  const dispatch = useDispatch()
  const dynamicFields = useSelector(state => state.dynamicField.data)??[]
  const x=useSelector(state => state.dynamicField)??[]
  const handleAdded = useCallback((childData) => {
    console.log("childData",childData)
    setAdding(true)
    setAddedArr(childData)
    setTimeout(() => {
      setAdding(true)
    }, 1000);
  }, [addedArr, adding])
    
  
console.log("dynamiccc Fields",x)
  useEffect(() => {
    dispatch(GetDynamicFieldAction(addedArr, adding))
   
  }, [addedArr, adding])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
           <Box class="right-side m-4">
        <AddField newDynamicField={handleAdded} />
        {/* <Button variant="outlined" startIcon={<Add/>} style={{color:"#00a15d"}} size="large" onClick={toogle}>Add Member</Button> */}
      </Box>
    
 < ViewField  newarr={newarr} dynamicFields={dynamicFields}  adding={adding} addedArr={addedArr}/>
   
    </Box>
  )
}
