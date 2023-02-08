 
import { useState } from 'react';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_DYNAMIC_FIELD_FAILURE, GET_DYNAMIC_FIELD_REQUEST, GET_DYNAMIC_FIELD_SUCCESS } from './Setting.type';
 
  const GetDynamicFieldAction=(addedArr, adding,deleting,deleteId)=>async(dispatch)=> {
   
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_DYNAMIC_FIELD_REQUEST })
        const response = await requests.get(`/company/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
       
       
        dispatch({
            type:GET_DYNAMIC_FIELD_SUCCESS,
            payload: response.data,
            deleting:deleting,
            deleteId:deleteId,
            addedArr:addedArr,
            adding:adding
        })
        
     
        
    } catch (error) {
        dispatch({
            type: GET_DYNAMIC_FIELD_FAILURE,
            payload: error.response
        })
      
    }
  
 }
 export default GetDynamicFieldAction;