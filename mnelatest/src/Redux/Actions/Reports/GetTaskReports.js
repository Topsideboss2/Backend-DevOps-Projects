 
import { useState } from 'react';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_TASK_REPORT_FAILURE, GET_TASK_REPORT_REQUEST, GET_TASK_REPORT_SUCCESS } from './report.type';
 
  const GetTaskReportAction=(reportId)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_TASK_REPORT_REQUEST })
        const response = await requests.get(`/reports/tasks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_TASK_REPORT_SUCCESS,
            payload: response.data,
        })
        
      
       
        
    } catch (error) {
        dispatch({
            type: GET_TASK_REPORT_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetTaskReportAction;