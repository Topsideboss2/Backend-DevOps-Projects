import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_MILESTONES_FAILURE, GET_MILESTONES_REQUEST, GET_MILESTONES_SUCCESS } from './milestone.type';
 
  const GetMilestonesAction=(id,deleteId,deleting,adding,addedMilestone,updatedMilestone,updateId)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_MILESTONES_REQUEST })
        const response = await requests.get(`/project/milestones/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_MILESTONES_SUCCESS,
            payload: response.data,
            deleteId:deleteId,
            deleting:deleting,
            adding:adding,
            addedMilestone:addedMilestone,
            updatedMilestone:updatedMilestone,
            updateId:updateId
          
            
        })
        
         
        
    } catch (error) {
        dispatch({
            type: GET_MILESTONES_FAILURE,
            payload: error.response.data
        })
        
        
    }
 }
 export default GetMilestonesAction;