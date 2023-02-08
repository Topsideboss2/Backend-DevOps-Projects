 

import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_DYNAMIC_REPORT_FAILURE, DELETE_DYNAMIC_REPORT_REQUEST, DELETE_DYNAMIC_REPORT_SUCCESS } from './Setting.type';
 
  const DeleteDynamicReportAction=(id)=>async(dispatch)=> {
   
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_DYNAMIC_REPORT_REQUEST })
        const response = await requests.delete(`/reports/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_DYNAMIC_REPORT_SUCCESS,
            payload: response.data
        })
      
       
        Swal.fire({
            title: 'Good job!',
            message: 'Report deleted successfuly',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
    } catch (error) {
        dispatch({
            type: DELETE_DYNAMIC_REPORT_FAILURE,
            payload: error.response.data
        })
        
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
  
 }
 export default DeleteDynamicReportAction;