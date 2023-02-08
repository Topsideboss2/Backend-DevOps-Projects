 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { UPDATE_TASKS_FAILURE, UPDATE_TASKS_REQUEST, UPDATE_TASKS_SUCCESS } from './Task.type';
 
  const UpdateTasksAction=(id,data,update)=>async(dispatch)=> {
   
  
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: UPDATE_TASKS_REQUEST })
        const response = await requests.put(`/company-tasks/${id}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:UPDATE_TASKS_SUCCESS,
            payload: response.data,
            isUpdated:update
            
        })
      
        Swal.fire({
            title: 'Good job!',
            text: 'Task updated Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: UPDATE_TASKS_FAILURE,
            payload: error.response.data,
            status:error.response
        })
        
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
    }
  
 }
 export default UpdateTasksAction;