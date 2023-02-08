import { SETUP_ROLES_FAILURE, SETUP_ROLES_REQUEST, SETUP_ROLES_SUCCESS } from "../../Actions/UserManagement/UserManagement.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const SetUpRoleReducer = (state = initialState, action) => {
        switch (action.type) {
            case SETUP_ROLES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case SETUP_ROLES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case SETUP_ROLES_FAILURE:
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
export default SetUpRoleReducer;