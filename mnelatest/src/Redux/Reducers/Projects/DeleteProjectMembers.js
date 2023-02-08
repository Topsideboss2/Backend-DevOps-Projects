import { DELETE_MEMBER_FAILURE, DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const DeleteProjectMemberReducer = (state = initialState, action) => {
        switch (action.type) {
            case DELETE_MEMBER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case DELETE_MEMBER_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case DELETE_MEMBER_FAILURE:
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
export default DeleteProjectMemberReducer;