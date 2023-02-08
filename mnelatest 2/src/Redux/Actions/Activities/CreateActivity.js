 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_ACTIVITIES_FAILURE, CREATE_ACTIVITIES_REQUEST, CREATE_ACTIVITIES_SUCCESS } from './activities.type';
 
  const CreateActivityAction=(data,navigate)=>async(dispatch)=> {
   
  
    const token=LocalStorage("token")
    
    try {
        console.log("data",data)
        dispatch({ type: CREATE_ACTIVITIES_REQUEST })
        const response = await requests.post(`/activities`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:CREATE_ACTIVITIES_SUCCESS,
            payload: response.data,
            
        })

      
        Swal.fire({
            title: 'Good job!',
            text: 'Activity added Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: CREATE_ACTIVITIES_FAILURE,
            payload: error.response.data,
            status:error.response
        })
        
        Swal.fire({
            title:'Error!',
           text: `${error.response.data.message}`,
            icon:'error'
    })
        
    }
  
 }
 export default CreateActivityAction;