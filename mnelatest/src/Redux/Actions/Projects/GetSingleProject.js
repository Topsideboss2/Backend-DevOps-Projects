
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_SINGLE_PROJECTS_FAILURE, GET_SINGLE_PROJECTS_REQUEST, GET_SINGLE_PROJECTS_SUCCESS } from './Projects.type';
 
  const GetSingleProjectsAction=(id)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_SINGLE_PROJECTS_REQUEST })
        const response = await requests.get(`/company-projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_SINGLE_PROJECTS_SUCCESS,
            payload: response.data
        })
        
      
       
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_PROJECTS_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetSingleProjectsAction;