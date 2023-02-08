import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_ACTIVITY_LOG_FAILURE, GET_ACTIVITY_LOG_REQUEST, GET_ACTIVITY_LOG_SUCCESS } from './Projects.type';
 
  const GetActivityLogAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_ACTIVITY_LOG_REQUEST })
        const response =  await requests.get(`/project/activitylog/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        })

        dispatch({
            type:GET_ACTIVITY_LOG_SUCCESS,
            payload: response.data,
          
        })
        
      
       
        
    } catch (error) {
        dispatch({
            type: GET_ACTIVITY_LOG_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetActivityLogAction;