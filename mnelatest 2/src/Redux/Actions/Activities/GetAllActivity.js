import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_ACTIVITIES_FAILURE, GET_ACTIVITIES_REQUEST, GET_ACTIVITIES_SUCCESS } from './activities.type';
 
  const GetActivitiesAction=(id,deleteId,deleting)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_ACTIVITIES_REQUEST })
        const response = await requests.get(`task/activities/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        console.log("iddd",response)
        dispatch({
            type:GET_ACTIVITIES_SUCCESS,
            payload: response.data, 
            deleteId:deleteId,
            deleting:deleting,
        })  
        
        
    } catch (error) {
        dispatch({
            type: GET_ACTIVITIES_FAILURE,
            payload: error.response.data,
            deleteId:deleteId,
            deleting:deleting,
           
            
        })
        
        
    }
 }
 export default GetActivitiesAction;