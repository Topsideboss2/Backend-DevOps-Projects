 
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_COMPANY_FAILURE, GET_COMPANY_REQUEST, GET_COMPANY_SUCCESS } from './Company.type';
 
  const GetAllAction=()=>async(dispatch)=> {
    const token=LocalStorage("token")
    try {
        dispatch({ type: GET_COMPANY_REQUEST })
        const response = await requests.get(`users/companies`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       

        dispatch({
            type: GET_COMPANY_SUCCESS,
            payload: response.data
        })
        
    } catch (error) {
        dispatch({
            type: GET_COMPANY_FAILURE,
            payload: error.response.data
        })
        
    }
  
 }
 export default GetAllAction;