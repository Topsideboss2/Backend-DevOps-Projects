import { requests } from '../../../Utils/Services/Api'
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from './Auth.Type'
import Swal from "sweetalert2";


const ForgotPasswordAction = (data) => async (dispatch) => {

    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        const response = await requests.post(`password/email`, data)
        
        
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'email sent successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default ForgotPasswordAction
