import { requests } from '../../../Utils/Services/Api'
import { UPDATE_MEMBER_FAILURE, UPDATE_MEMBER_REQUEST, UPDATE_MEMBER_SUCCESS } from "./Projects.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const UpdateProjectMemberAction = (memberId) => async (dispatch) => {
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: UPDATE_MEMBER_REQUEST })
        const response = await requests.put(`/projectmembers/${memberId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: UPDATE_MEMBER_SUCCESS,
            payload: response.data

        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'Member Updated successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      

    } catch (error) {
        dispatch({
            type: UPDATE_MEMBER_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire({
           title: 'Error!',
            text:`${error.response.data.message}`,
            icon:'error'
    })
    }
}
export default UpdateProjectMemberAction;
