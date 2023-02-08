 
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_PERMISSIONS_FAILURE, GET_PERMISSIONS_REQUEST, GET_PERMISSIONS_SUCCESS } from './UserManagement.type';
 
  const GetPermissionsAction=()=>async(dispatch)=> {
    const token=LocalStorage("token")
    try {
        dispatch({ type: GET_PERMISSIONS_REQUEST })
        const response = await requests.get(`/permissions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       

        dispatch({
            type: GET_PERMISSIONS_SUCCESS,
            payload: response.data
        })
        
    } catch (error) {
        dispatch({
            type: GET_PERMISSIONS_FAILURE,
            payload: error.response.data
        })
        
    }
  
 }
 export default GetPermissionsAction;