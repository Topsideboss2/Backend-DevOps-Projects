import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_MILESTONES_FAILURE, DELETE_MILESTONES_REQUEST, DELETE_MILESTONES_SUCCESS } from './milestone.type';
 
  const DeleteMilestonesAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_MILESTONES_REQUEST })
        const response = await requests.delete(`/company-milestones/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_MILESTONES_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'Milestone Deleted Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      
       
        
    } catch (error) {
        dispatch({
            type: DELETE_MILESTONES_FAILURE,
            payload: error.response.data
        })
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
        
    }
  
 }
 export default DeleteMilestonesAction;