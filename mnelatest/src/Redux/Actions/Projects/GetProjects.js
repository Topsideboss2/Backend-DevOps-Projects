import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_PROJECTS_FAILURE, GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS } from './Projects.type';
 
  const GetProjectsAction=(deleteId,deleting)=>async(dispatch)=> {
    
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: GET_PROJECTS_REQUEST })
        const response = await requests.get(`/company/projects`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:GET_PROJECTS_SUCCESS,
            payload: response.data,
            deleteId:deleteId,
            deleting:deleting
        })
        
      
       
        
    } catch (error) {
        dispatch({
            type: GET_PROJECTS_FAILURE,
            payload: error.response.data
        })
        
        
    }
  
 }
 export default GetProjectsAction;