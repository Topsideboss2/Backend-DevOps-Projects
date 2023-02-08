import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_TASKS_FAILURE, DELETE_TASKS_REQUEST, DELETE_TASKS_SUCCESS } from './Task.type';
 
  const DeleteTaskAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_TASKS_REQUEST })
        const response = await requests.delete(`/company-tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_TASKS_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'Task Deleted Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      
       
        
    } catch (error) {
        dispatch({
            type: DELETE_TASKS_FAILURE,
            payload: error.response.data
        })
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
        
    }
  
 }
 export default DeleteTaskAction;