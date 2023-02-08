import { REGISTER_MEMBER_FAILURE, REGISTER_MEMBER_REQUEST, REGISTER_MEMBER_SUCCESS } from "../../Actions/InviteMembers/register.type";


 const initialState = {
    loading:false,
    error:"",
    data:[]
 }
    const RegisterInvitedMemberReducer = (state = initialState, action) => {
        switch (action.type) {
            case REGISTER_MEMBER_REQUEST:
                return {
                    ...state,
                    loading:true,
                }
                break;
            case REGISTER_MEMBER_SUCCESS:
                return {
                    ...state,
                    data:action.payload,
                    loading:false
                }
                break;
            case REGISTER_MEMBER_FAILURE:
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
export default RegisterInvitedMemberReducer;