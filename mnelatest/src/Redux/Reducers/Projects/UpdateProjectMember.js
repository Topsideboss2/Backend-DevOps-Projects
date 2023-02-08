import { UPDATE_MEMBER_FAILURE, UPDATE_MEMBER_REQUEST, UPDATE_MEMBER_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const UpdateProjectMemberReducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_MEMBER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case UPDATE_MEMBER_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case UPDATE_MEMBER_FAILURE:
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
export default UpdateProjectMemberReducer;