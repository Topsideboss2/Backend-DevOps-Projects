 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_TASKS_FAILURE, CREATE_TASKS_REQUEST, CREATE_TASKS_SUCCESS } from './Task.type';
 
  const CreateTasksAction=(data,navigate)=>async(dispatch)=> {
   
  
    const token=LocalStorage("token")
    
    try {
        console.log("data",data)
        dispatch({ type: CREATE_TASKS_REQUEST })
        const response = await requests.post(`/tasks`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:CREATE_TASKS_SUCCESS,
            payload: response.data,
            
        })

      
        Swal.fire({
            title: 'Good job!',
            text: 'Task added Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: CREATE_TASKS_FAILURE,
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
 export default CreateTasksAction;