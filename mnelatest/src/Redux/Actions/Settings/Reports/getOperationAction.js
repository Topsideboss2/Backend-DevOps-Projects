
import { LocalStorage } from '../../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../../Utils/Services/Api';
import { GET_OPERATION_FAILURE, GET_OPERATION_REQUEST, GET_OPERATION_SUCCESS } from './Report.type';
 
  const GetOperationAction=()=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_OPERATION_REQUEST })
        const response = await requests.get(`/company/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_OPERATION_SUCCESS,
            payload: response.data
        })
      
       
        
    } catch (error) {
        dispatch({
            type: GET_OPERATION_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetOperationAction;