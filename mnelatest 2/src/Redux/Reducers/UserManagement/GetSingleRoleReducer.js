import { GET_SINGLE_ROLE_FAILURE, GET_SINGLE_ROLE_REQUEST, GET_SINGLE_ROLE_SUCCESS } from "../../Actions/UserManagement/UserManagement.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const GetSingleRoleReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_SINGLE_ROLE_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case GET_SINGLE_ROLE_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case GET_SINGLE_ROLE_FAILURE:
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
export default GetSingleRoleReducer;