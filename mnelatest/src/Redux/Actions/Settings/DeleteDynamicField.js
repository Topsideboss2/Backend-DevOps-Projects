 
import Swal from 'sweetalert2';
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { DELETE_DYNAMIC_FIELD_FAILURE, DELETE_DYNAMIC_FIELD_REQUEST, DELETE_DYNAMIC_FIELD_SUCCESS } from './Setting.type';
 
  const DeleteDynamicFieldAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: DELETE_DYNAMIC_FIELD_REQUEST })
        const response = await requests.delete(`/fields/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:DELETE_DYNAMIC_FIELD_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'Field deleted successfuly',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      
       
        
    } catch (error) {
        dispatch({
            type: DELETE_DYNAMIC_FIELD_FAILURE,
            payload: error.response.data
        })
       
        Swal.fire({
            title:'Error!',
            text:`${error.response.message}`,
            icon:'error',
    })
        
    }
  
 }
 export default DeleteDynamicFieldAction;