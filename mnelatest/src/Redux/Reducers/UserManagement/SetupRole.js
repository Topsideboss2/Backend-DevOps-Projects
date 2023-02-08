import { CREATE_ROLES_FAILURE, CREATE_ROLES_REQUEST, CREATE_ROLES_SUCCESS } from "../../Actions/UserManagement/UserManagement.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const CreateRoleReducer = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_ROLES_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case CREATE_ROLES_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case CREATE_ROLES_FAILURE:
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
export default CreateRoleReducer;