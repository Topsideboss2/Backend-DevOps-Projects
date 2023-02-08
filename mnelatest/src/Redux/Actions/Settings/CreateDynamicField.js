 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_DYNAMIC_FIELD_FAILURE, CREATE_DYNAMIC_FIELD_REQUEST, CREATE_DYNAMIC_FIELD_SUCCESS } from './Setting.type';
 
  const CreateDynamicFieldAction=(data,navigate)=>async(dispatch)=> {
  
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: CREATE_DYNAMIC_FIELD_REQUEST })
        const response = await requests.post(`/fields`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:CREATE_DYNAMIC_FIELD_SUCCESS,
            payload: response,
            
        })
     
        Swal.fire({
            title: 'Good job!',
            message: 'field added Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: CREATE_DYNAMIC_FIELD_FAILURE,
            payload: error.response.data,
            status:error.response
        })
        console.log("err",error.response)
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default CreateDynamicFieldAction;