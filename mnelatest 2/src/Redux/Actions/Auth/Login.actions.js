import { requests } from '../../../Utils/Services/Api'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './Auth.Type'
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';


const LoginActions = (data,navigate) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const response = await requests.post(`auth/login`, data)
        console.log("response", response)
        const user = {
            name: response.data.user.name,
            email: response.data.user.email,
        }
        console.log("login",response.data)
        LocalStorage("token",  response.data.accessToken,'save')
        LocalStorage("initiallogin",response.data.initialLogin,"save")
        LocalStorage("user", JSON.stringify(user), 'save')
        if (!response.data.activeCompany) {
            navigate("/my-companies")
        } else {
            // if (response.data.user.active ==true){
            //     navigate("/")  
            // }else{
            //     navigate("/my-companies")
            // }
            response.data.initialLogin? navigate("/general-settings") : navigate("/")
            
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
        Swal.fire({
            title: 'Good job!',
            message: 'Login Successfully',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default LoginActions
