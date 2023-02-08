import { requests } from '../../../Utils/Services/Api'
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './Auth.Type'
import Swal from "sweetalert2";
const RegisterActions = (data, navigate) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_REQUEST })
        const response = await requests.post(`auth/register`, data)
        
        navigate("/verifyemail")
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            text: 'registered Successfully.Kindly go to your email to verify your email ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default RegisterActions
