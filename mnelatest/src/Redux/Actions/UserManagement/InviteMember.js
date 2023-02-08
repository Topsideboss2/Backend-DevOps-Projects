import { requests } from '../../../Utils/Services/Api'
import { INVITE_MEMBER_FAILURE, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS } from "./UserManagement.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const InviteMemberAction = (data,navigate) => async (dispatch) => {
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: INVITE_MEMBER_REQUEST })
        const response = await requests.post(`member/invitation`, data,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: INVITE_MEMBER_SUCCESS,
            payload: response.data

        })

    Swal.fire({
            title: 'Good job!',
            text: 'An invitation email has been sent successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })

        window.location.reload()
        // navigate (`/`)

    } catch (error) {
        console.log("errroorr",error)
        dispatch({
            type: INVITE_MEMBER_FAILURE,
            payload: error.response
        })
        Swal.fire({
           title: 'Error!',
           text: `${error}`,
           icon: 'error'
    })
    }
}
export default InviteMemberAction
