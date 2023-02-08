import { requests } from '../../../Utils/Services/Api'
import { INVITE_MEMBER_FAILURE, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS } from "./Projects.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const AddProjectMemberAction = (data,navigate) => async (dispatch) => {
    console.log("add proj",data)
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: INVITE_MEMBER_REQUEST })
        const response = await requests.post(`/projectmembers`, data,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: INVITE_MEMBER_SUCCESS,
            payload: response.data

        })
        console.log("add proj res",response)
        
        Swal.fire({
            title: 'Good job!',
            text: 'An invitation email has been sent successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
      

    } catch (error) {
        dispatch({
            type: INVITE_MEMBER_FAILURE,
            payload: error.response.data.message
        })
        console.log("add proj err",error)
        Swal.fire({
           title: 'Error!',
            text:`${error.response.data.message}`,
            icon:'error'
    })
    }
}
export default AddProjectMemberAction
