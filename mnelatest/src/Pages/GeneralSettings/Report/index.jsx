
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetDynamicFieldAction from '../../../Redux/Actions/Settings/GetDynamicFields.js'
import AddReportMain from './OpenDrawer.jsx'
import ViewReport from './ViewReport.jsx'
import GetDynamicReportAction from '../../../Redux/Actions/Settings/GetDynamicReports.js'
// import DynamicField from './ProjectSettings.jsx'


export default function ReportSetting() {
  const [newarr,setNewarr]=useState([])
  const [adding,setAdding]=useState(false)
  const [addedArr,setAddedArr]=useState({})
  const dispatch = useDispatch()
  const dynamicReports = useSelector(state => state.dynamicReport.data)

  const handleAdded = useCallback((childData) => {
    setAdding(true)
    setAddedArr(childData)
  
    setTimeout(() => {
      setAdding(true)
    }, 1000);
  }, [addedArr, adding])

  useEffect(() => {
    dispatch(GetDynamicReportAction(addedArr, adding))
    
  }, [addedArr, adding])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
           <Box class="right-side m-4">
        <AddReportMain newDynamicField={handleAdded}/>
        {/* <Button variant="outlined" startIcon={<Add/>} style={{color:"#00a15d"}} size="large" onClick={toogle}>Add Member</Button> */}
      </Box>
    
 < ViewReport  dynamicReports ={dynamicReports }/>
   
    </Box>
  )
}
