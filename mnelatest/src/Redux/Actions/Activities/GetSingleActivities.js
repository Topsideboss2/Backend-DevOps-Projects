
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_ACTIVITY_FAILURE, GET_SINGLE_ACTIVITY_REQUEST, GET_SINGLE_ACTIVITY_SUCCESS } from './activities.type';
 
  const GetSingleActivityAction=(id)=>async(dispatch)=> {
   
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_SINGLE_ACTIVITY_REQUEST })
        const response = await requests.get(`company-activities/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_SINGLE_ACTIVITY_SUCCESS,
            payload: response.data,
            
        })
        
    
       
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_ACTIVITY_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetSingleActivityAction;