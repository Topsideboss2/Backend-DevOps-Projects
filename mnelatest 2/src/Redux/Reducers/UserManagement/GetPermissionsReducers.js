import { GET_PERMISSIONS_FAILURE, GET_PERMISSIONS_REQUEST, GET_PERMISSIONS_SUCCESS } from "../../Actions/UserManagement/UserManagement.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetPermissionsReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_PERMISSIONS_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_PERMISSIONS_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_PERMISSIONS_FAILURE:
                return {
                    ...state,
                    error:action.payload,
                    loading:false
                }
                break;
            default:
                return state;
                break;

    }
}
export default GetPermissionsReducer;