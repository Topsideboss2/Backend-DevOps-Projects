import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_PROJECTS_FAILURE, DELETE_PROJECTS_REQUEST, DELETE_PROJECTS_SUCCESS } from './Projects.type';
 
  const DeleteProjectsAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_PROJECTS_REQUEST })
        const response = await requests.delete(`company-projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_PROJECTS_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'project Deleted Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      
       
        
    } catch (error) {
        dispatch({
            type: DELETE_PROJECTS_FAILURE,
            payload: error.response.data
        })
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
        
    }
  
 }
 export default DeleteProjectsAction;