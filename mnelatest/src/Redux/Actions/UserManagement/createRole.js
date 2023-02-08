import { requests } from '../../../Utils/Services/Api'
import { SETUP_ROLES_FAILURE, SETUP_ROLES_REQUEST, SETUP_ROLES_SUCCESS } from "./UserManagement.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const SetupRoleAction = (data,navigate) => async (dispatch) => {
    const token=LocalStorage("token")
    console.log("switch data",data)
    try {
        dispatch({ type: SETUP_ROLES_REQUEST })
        const response = await requests.post(`/roles`,data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        
        dispatch({
            type: SETUP_ROLES_SUCCESS,
            payload: response.data

        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'Role setup successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
            showConfirmButton: true,
        }).then((result)=>{
            console.log("result")
            if(result) {
                window.location.reload()
            } 
        })
        
    } catch (error) {
        dispatch({
            type: SETUP_ROLES_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default SetupRoleAction
