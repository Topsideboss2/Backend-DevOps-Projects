 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { UPDATE_MILESTONES_FAILURE, UPDATE_MILESTONES_REQUEST, UPDATE_MILESTONES_SUCCESS } from './milestone.type';
 
  const UpdateMilestonesAction=(id,data,update)=>async(dispatch)=> {
   
  
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: UPDATE_MILESTONES_REQUEST })
        const response = await requests.put(`/company-milestones/${id}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:UPDATE_MILESTONES_SUCCESS,
            payload: response.data,
            isUpdated:update
            
        })
      
        Swal.fire({
            title: 'Good job!',
            text: 'project Updated Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: UPDATE_MILESTONES_FAILURE,
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
 export default UpdateMilestonesAction;