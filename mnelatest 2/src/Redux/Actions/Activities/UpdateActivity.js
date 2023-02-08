 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { UPDATE_ACTIVITIES_FAILURE, UPDATE_ACTIVITIES_REQUEST, UPDATE_ACTIVITIES_SUCCESS } from './milestone.type';
 
  const UpdateActivityAction=(id,data,update)=>async(dispatch)=> {
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: UPDATE_ACTIVITIES_REQUEST })
        const response = await requests.put(`company-activities/${id}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:UPDATE_ACTIVITIES_SUCCESS,
            payload: response.data,
            isUpdated:update
            
        })
      
        Swal.fire({
            title: 'Good job!',
            text: 'Activity Updated Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: UPDATE_ACTIVITIES_FAILURE,
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
 export default UpdateActivityAction;