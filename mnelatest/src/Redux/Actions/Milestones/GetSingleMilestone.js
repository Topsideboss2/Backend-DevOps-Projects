
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_MILESTONES_FAILURE, GET_SINGLE_MILESTONES_REQUEST, GET_SINGLE_MILESTONES_SUCCESS } from './milestone.type';
 
  const GetSingleMilestoneAction=(id)=>async(dispatch)=> {
   
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_SINGLE_MILESTONES_REQUEST })
        const response = await requests.get(`/company-milestones/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_SINGLE_MILESTONES_SUCCESS,
            payload: response.data,
            
        })
        
    
       
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_MILESTONES_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetSingleMilestoneAction;