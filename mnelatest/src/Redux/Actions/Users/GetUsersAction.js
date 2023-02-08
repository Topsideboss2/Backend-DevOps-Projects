 
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_COMPANY_USERS_FAILURE, GET_COMPANY_USERS_REQUEST, GET_COMPANY_USERS_SUCCESS } from "./users.type"
 
  const GetCompanyUserAction=()=>async(dispatch)=> {
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_COMPANY_USERS_REQUEST })
        const response = await requests.get(`/company/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("reducer",response.data)

        dispatch({
            type: GET_COMPANY_USERS_SUCCESS,
            payload: response.data
        })
        
    } catch (error) {
        dispatch({
            type: GET_COMPANY_USERS_FAILURE,
            payload: error.response.data
        })
        
    }
  
 }
 export default GetCompanyUserAction;