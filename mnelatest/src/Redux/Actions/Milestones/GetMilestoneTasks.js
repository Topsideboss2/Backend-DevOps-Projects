import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_MILESTONES_TASKS_FAILURE, GET_MILESTONES_TASKS_REQUEST, GET_MILESTONES_TASKS_SUCCESS } from './milestone.type';
 
  const GetMilestonesTasksAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_MILESTONES_TASKS_REQUEST })
        const response = await requests.get(`milestone/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_MILESTONES_TASKS_SUCCESS,
            payload: response.data,
            
          
            
        })
        
         
        
    } catch (error) {
        dispatch({
            type: GET_MILESTONES_TASKS_FAILURE,
            payload: error.response.data
        })
        
        
    }
 }
 export default GetMilestonesTasksAction;