import { requests } from '../../../Utils/Services/Api'
import { DELETE_MEMBER_FAILURE, DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS } from "./Projects.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const DeleteProjectMemberAction = (memberId) => async (dispatch) => {
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: DELETE_MEMBER_REQUEST })
        const response = await requests.delete(`/projectmembers/${memberId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: DELETE_MEMBER_SUCCESS,
            payload: response.data

        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'Member deleted successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      

    } catch (error) {
        dispatch({
            type: DELETE_MEMBER_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire({
           title: 'Error!',
            text:`${error.response.data.message}`,
            icon:'error'
    })
    }
}
export default DeleteProjectMemberAction
