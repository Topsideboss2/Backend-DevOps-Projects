import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_TASKS_FAILURE, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from './Task.type';
 
  const GetTasksAction=(id,deleteId,deleting,adding,addedTask,updatedTask,updateId)=>async(dispatch)=> {
    console.log("addedTask",addedTask)
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_TASKS_REQUEST })
        const response = await requests.get(`milestone/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_TASKS_SUCCESS,
            payload: response.data,
            deleteId:deleteId,
            deleting:deleting,
            adding:adding,
            addedTask:addedTask,
            updatedTask:updatedTask,
            updateId:updateId
          
            
        })
        
         
        
    } catch (error) {
        dispatch({
            type: GET_TASKS_FAILURE,
            payload: error.response.data
        })
        
        
    }
 }
 export default GetTasksAction;