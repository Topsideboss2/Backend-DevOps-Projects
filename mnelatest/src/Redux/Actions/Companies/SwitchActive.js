 
import Swal from 'sweetalert2';
import { LocalStorage, RemoveLocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { SWITCH_ACTIVE_COMPANY_FAILURE, SWITCH_ACTIVE_COMPANY_REQUEST, SWITCH_ACTIVE_COMPANY_SUCCESS } from './Company.type';
 
  const SwitchActiveAction=(data,navigate)=>async(dispatch)=> {
   
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: SWITCH_ACTIVE_COMPANY_REQUEST })
        const response = await requests.post(`company/switch`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:SWITCH_ACTIVE_COMPANY_SUCCESS,
            payload: response.data
        })
        RemoveLocalStorage("userPermissions")
        Swal.fire({
            title: 'Good job!',
            message: 'Active company switched Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate("/")
        
    } catch (error) {
        dispatch({
            type: SWITCH_ACTIVE_COMPANY_FAILURE,
            payload: error.response.data
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default SwitchActiveAction;