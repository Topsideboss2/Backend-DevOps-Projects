 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { UPDATE_DYNAMIC_REPORT_FAILURE, UPDATE_DYNAMIC_REPORT_REQUEST, UPDATE_DYNAMIC_REPORT_SUCCESS } from './Setting.type';
 
  const UpdateDynamicReportAction=(data,id)=>async(dispatch)=> {
   
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: UPDATE_DYNAMIC_REPORT_REQUEST })
        const response = await requests.put(`/reports/${id}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:UPDATE_DYNAMIC_REPORT_SUCCESS,
            payload: response.data
        })
        
        Swal.fire({
            title: 'Good job!',
            message: 'Report updatedd successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: UPDATE_DYNAMIC_REPORT_FAILURE,
            payload: error.response.data
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default UpdateDynamicReportAction;