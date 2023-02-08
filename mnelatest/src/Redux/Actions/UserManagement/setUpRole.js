import { requests } from '../../../Utils/Services/Api'
import { CREATE_ROLES_FAILURE, CREATE_ROLES_REQUEST, CREATE_ROLES_SUCCESS } from "./UserManagement.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const CreateRoleAction = (data,navigate) => async (dispatch) => {
    const token=LocalStorage("token")
    console.log("switch data",data)
    try {
        dispatch({ type: CREATE_ROLES_REQUEST })
        const response = await requests.post(`syncRoles`,data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        
        dispatch({
            type: CREATE_ROLES_SUCCESS,
            payload: response.data

        })
        
        Swal.fire({
            title: 'Good job!',
            text: 'Role setup successfully ',
            icon: 'success',
            confirmButtonColor: '#00a15d',
        })
        navigate (`/`)

    } catch (error) {
        dispatch({
            type: CREATE_ROLES_FAILURE,
            payload: error.response.data.message
        })
        Swal.fire(
            'Error!',
            `${error.response.data.message}`,
            'error'
        )
    }
}
export default CreateRoleAction
