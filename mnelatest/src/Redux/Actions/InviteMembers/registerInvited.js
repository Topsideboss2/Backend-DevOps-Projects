import { requests } from '../../../Utils/Services/Api'
import { REGISTER_MEMBER_FAILURE, REGISTER_MEMBER_REQUEST, REGISTER_MEMBER_SUCCESS } from "./register.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const RegisterMemberAction = (data,navigate) => async (dispatch) => {
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: REGISTER_MEMBER_REQUEST })
        const response = await requests.post(`/registration`, data,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: REGISTER_MEMBER_SUCCESS,
            payload: response.data

        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'You have been registered successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate (`/`)

    } catch (error) {
        dispatch({
            type: REGISTER_MEMBER_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire({
            title:'Error!',
            text:`${error.response.data.message}`,
            icon:'error'
    })
    }
}
export default RegisterMemberAction
