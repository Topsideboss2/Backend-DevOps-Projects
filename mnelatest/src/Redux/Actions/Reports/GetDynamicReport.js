 
import { useState } from 'react';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_REPORT_FAILURE, GET_SINGLE_REPORT_REQUEST, GET_SINGLE_REPORT_SUCCESS } from './report.type';
 
  const GetSingleReportAction=(reportId)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_SINGLE_REPORT_REQUEST })
        const response = await requests.get(`/reports/dynamic/${reportId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_SINGLE_REPORT_SUCCESS,
            payload: response.data,
        })
        
      
       
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_REPORT_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetSingleReportAction;