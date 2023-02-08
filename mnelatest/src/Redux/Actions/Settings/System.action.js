 
import Swal from 'sweetalert2';
import { LocalStorage, RemoveLocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GENERAL_SETTING_FAILURE, GENERAL_SETTING_REQUEST, GENERAL_SETTING_SUCCESS } from './Setting.type';
 
  const GeneralSettingsAction=(data,navigate)=>async(dispatch)=> {
    console.log(" switch data",data)
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GENERAL_SETTING_REQUEST })
        const response = await requests.post(`/companysettings`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GENERAL_SETTING_SUCCESS,
            payload: response.data
        })
        RemoveLocalStorage("userPermissions")
        Swal.fire({
            title: 'Good job!',
            message: 'Company Settigs successfully created',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate("/")
        
    } catch (error) {
        dispatch({
            type: GENERAL_SETTING_FAILURE,
            payload: error.response.data
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
        
    }
  
 }
 export default GeneralSettingsAction;