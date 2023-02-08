 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { UPDATE_DYNAMIC_FIELD_FAILURE, UPDATE_DYNAMIC_FIELD_REQUEST, UPDATE_DYNAMIC_FIELD_SUCCESS } from './Setting.type';
 
  const UpdateDynamicFieldAction=(data,id)=>async(dispatch)=> {
    const token=LocalStorage("token")
    console.log("token",token)
    
    try {
        dispatch({ type: UPDATE_DYNAMIC_FIELD_REQUEST })
        const response = await requests.put(`/fields/${id}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:UPDATE_DYNAMIC_FIELD_SUCCESS,
            payload: response.data
        })
       
        Swal.fire({
            title: 'Good job!',
            message: 'Field Updated Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: UPDATE_DYNAMIC_FIELD_FAILURE,
            payload: error.response.data
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default UpdateDynamicFieldAction;