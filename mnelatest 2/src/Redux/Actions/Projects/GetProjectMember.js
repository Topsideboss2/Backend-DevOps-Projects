import { requests } from '../../../Utils/Services/Api'
import { GET_MEMBER_FAILURE, GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS } from "./Projects.type"
import Swal from "sweetalert2";
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';



const GetProjectMemberAction = (projectId,isdelete,deleteId,isadd,addedData) => async (dispatch) => {
    const token=LocalStorage("token")
   
    try {
        dispatch({ type: GET_MEMBER_REQUEST })
        const response = await requests.GET(`/projectmembers/${projectId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
          }
          })
        
        
        dispatch({
            type: GET_MEMBER_SUCCESS,
            payload: response.data,
            deleting:isdelete,
            deleteId:deleteId,
            adding:isadd,
            addedData:addedData


        })
        
     
      

    } catch (error) {
        dispatch({
            type: GET_MEMBER_FAILURE,
            payload: error.response.data.message
        })
    
    }
}
export default GetProjectMemberAction
