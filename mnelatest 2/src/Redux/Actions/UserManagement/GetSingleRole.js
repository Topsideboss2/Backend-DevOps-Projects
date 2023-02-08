 
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_ROLE_FAILURE, GET_SINGLE_ROLE_REQUEST, GET_SINGLE_ROLE_SUCCESS } from './UserManagement.type';
 
  const GetSingleRoleAction=(id)=>async(dispatch)=> {
    const token=LocalStorage("token")
    try {
        dispatch({ type: GET_SINGLE_ROLE_REQUEST })
        const response = await requests.get(`/roles/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       

        dispatch({
            type: GET_SINGLE_ROLE_SUCCESS,
            payload: response.data
        })
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_ROLE_FAILURE,
            payload: error.response.data
        })
        
    }
  
 }
 export default GetSingleRoleAction;