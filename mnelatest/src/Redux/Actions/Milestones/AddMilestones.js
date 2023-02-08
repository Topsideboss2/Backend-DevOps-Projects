 
import Swal from 'sweetalert2';
import { LocalStorage} from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { CREATE_MILESTONES_FAILURE, CREATE_MILESTONES_REQUEST, CREATE_MILESTONES_SUCCESS } from './milestone.type';
 
  const CreateMilestonesAction=(data,navigate)=>async(dispatch)=> {
   
  
    const token=LocalStorage("token")
    
    try {
        console.log("data",data)
        dispatch({ type: CREATE_MILESTONES_REQUEST })
        const response = await requests.post(`/milestones`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 

        dispatch({
            type:CREATE_MILESTONES_SUCCESS,
            payload: response.data,
            
        })

      
        Swal.fire({
            title: 'Good job!',
            text: 'Milestone added Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
       
        
    } catch (error) {
        dispatch({
            type: CREATE_MILESTONES_FAILURE,
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
 export default CreateMilestonesAction;