
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_TASKS_FAILURE, GET_SINGLE_TASKS_REQUEST, GET_SINGLE_TASKS_SUCCESS } from './Task.type'
 
  const GetSingleTaskAction=(id)=>async(dispatch)=> {
  
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_SINGLE_TASKS_REQUEST })
        const response = await requests.get(`company-tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
       
        dispatch({
            type:GET_SINGLE_TASKS_SUCCESS,
            payload: response.data,
            
        })
        
    
       
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_TASKS_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetSingleTaskAction;