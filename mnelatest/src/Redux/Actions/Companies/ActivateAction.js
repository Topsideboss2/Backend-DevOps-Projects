import { requests } from '../../../Utils/Services/Api'
import { ACTIVATE_COMPANY_FAILURE, ACTIVATE_COMPANY_REQUEST, ACTIVATE_COMPANY_SUCCESS } from "./Company.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const ActivateAction = (data,navigate) => async (dispatch) => {
    const token=LocalStorage("token")
    console.log("switch data",data)
    try {
        dispatch({ type: ACTIVATE_COMPANY_REQUEST })
        const response = await requests.post(`company/activate`,data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        
        dispatch({
            type: ACTIVATE_COMPANY_SUCCESS,
            payload: response.data

        })
        console.log("activate company",response.data.permissions)
        LocalStorage("userPermissions",JSON.stringify(response.data.permissions),"save")
        Swal.fire({
            title: 'Good job!',
            text: 'Company Activated Successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate (`/`)

    } catch (error) {
        dispatch({
            type: ACTIVATE_COMPANY_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default ActivateAction
