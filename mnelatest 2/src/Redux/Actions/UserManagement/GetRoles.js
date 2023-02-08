 
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';
import { GET_ROLES_FAILURE, GET_ROLES_REQUEST, GET_ROLES_SUCCESS } from './UserManagement.type';
 
  const GetRoleAction=(addedArr, adding,deleting,deleteId)=>async(dispatch)=> {
   
    const token=LocalStorage("token")
    try {
        dispatch({ type: GET_ROLES_REQUEST })
        const response = await requests.get("/company/roles", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       console.log("addedArr",response)
 
        dispatch({
            type: GET_ROLES_SUCCESS,
            payload: response.data,  deleting:deleting,
            deleteId:deleteId,
            addedArr:addedArr,
            adding:adding
        })
        
    } catch (error) {
        dispatch({
            type: GET_ROLES_FAILURE,
            payload: error.response.data
        })
        
    }
  
 }
 export default GetRoleAction;