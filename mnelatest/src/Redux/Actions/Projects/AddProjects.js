 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_PROJECTS_FAILURE, CREATE_PROJECTS_REQUEST, CREATE_PROJECTS_SUCCESS } from './Projects.type';
 
  const CreateProjectsAction=(data,navigate)=>async(dispatch)=> {
  
  
    const token=LocalStorage("token")
    
    try {
        dispatch({ type: CREATE_PROJECTS_REQUEST })
        const response = await requests.post(`/projects`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        

        dispatch({
            type:CREATE_PROJECTS_SUCCESS,
            payload: response.data,
            
        })
     
        Swal.fire({
            title: 'Good job!',
            text: 'project added Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate(`/project-details/${response.data.id}`)
       
        
    } catch (error) {
        console.log("data",error.response.data.message)
        dispatch({
            type: CREATE_PROJECTS_FAILURE,
            payload: error.response.data,
            status:error.response

        })
      
        Swal.fire({
            title:'Error!',
            text:`${error.response.data.message}`,
            icon:'error'
    })
   
        
    }
  
 }
 export default CreateProjectsAction;