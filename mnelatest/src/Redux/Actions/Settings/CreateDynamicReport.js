 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_DYNAMIC_REPORT_FAILURE, CREATE_DYNAMIC_REPORT_REQUEST, CREATE_DYNAMIC_REPORT_SUCCESS } from './Setting.type';
 
  const CreateDynamicReportAction=(data,navigate)=>async(dispatch)=> {
    console.log(" switch data",data)
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: CREATE_DYNAMIC_REPORT_REQUEST })
        const response = await requests.post(`/reports`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:CREATE_DYNAMIC_REPORT_SUCCESS,
            payload: response.data
        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'Report created successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: CREATE_DYNAMIC_REPORT_FAILURE,
            payload: error.response.data
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default CreateDynamicReportAction;