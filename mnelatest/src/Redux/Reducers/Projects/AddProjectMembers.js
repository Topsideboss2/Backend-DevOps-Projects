import { INVITE_MEMBER_FAILURE, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS } from "../../Actions/Projects/Projects.type";


 const initialState = {
    loading:false,
    error:"",
    data:{}
 }
    const AddProjectMemberReducer = (state = initialState, action) => {
        
        switch (action.type) {
            case INVITE_MEMBER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case INVITE_MEMBER_SUCCESS:
                return {
                    ...state,
                    data:action.payload,                  
                    loading:false
                }
                break;
            case INVITE_MEMBER_FAILURE:
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
export default AddProjectMemberReducer;