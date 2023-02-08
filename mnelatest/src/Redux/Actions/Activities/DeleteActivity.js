import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_ACTIVITIES_FAILURE, DELETE_ACTIVITIES_REQUEST, DELETE_ACTIVITIES_SUCCESS } from './activities.type';
 
  const DeleteActivitiesAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_ACTIVITIES_REQUEST })
        const response = await requests.delete(`company-activities/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_ACTIVITIES_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'Activity Deleted Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      
       
        
    } catch (error) {
        dispatch({
            type: DELETE_ACTIVITIES_FAILURE,
            payload: error.response.data
        })
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
        
    }
  
 }
 export default DeleteActivitiesAction;